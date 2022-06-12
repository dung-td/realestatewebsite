import { useState, useEffect } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import CollapseDescription from "../../components/EstateDetail/CollapseDescription"
import { HeartIcon, ClockIcon, HomeIcon } from "@heroicons/react/outline"
import { PhoneIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {Unit} from '../../Enum'
import PostContent from '../../components/EstateDetail/PostContent'
import PostDto from '../../interfaces/PostDTO'
import style from "../../public/css/Estate.module.css"
import server from "../../interfaces/server"

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import EstateCard from "../../components/Estate/EstateCard"
import { Carousel } from "react-responsive-carousel"
interface TitleSectionProps{
    title: string,
    issuedDate?: string,
    address?: string
}

const Separator: React.FC = () => {
  return <div className="my-3 border-b border-y-black container"></div>
}
const TitleSection = (props: TitleSectionProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black uppercase">{props.title}</h1>
      {props?.issuedDate && (
        <div className="mt-3">
          <ClockIcon className="w-5 h-5 inline-block" />{" "}
          {`Ngày đăng: ${props.issuedDate}`}
        </div>
      )}
      {props?.address && (
        <div className="mt-1">
          <HomeIcon className="w-5 h-5 inline-block" />{" "}
          {`Địa chỉ: ${props.address}`}
        </div>
      )}
      <div className="my-3 border-b border-y-black container"></div>
    </div>
  )
}
interface IPost {
  post: PostDto
}
const EstateDetail: NextPage<IPost> = (props) => {
  const [wards, setWards] = useState([])
  const [relatedPosts, setRelatedPosts] = useState<Array<any>>(new Array())
  useEffect(()=>{
    fetch(`${server}/post/get?purpose=${props.post.forSaleOrRent}&limit=3`)
      .then((res) => res.json())
      .then((data) => {
        let posts = data.data
        let randomEstates = new Array()

        posts.forEach((post: any) => {
          let obj = {
            _id: post._id,
            title: post.title,
            address: post.address,
            estateType: post.estateType,
            thumbnail: post.images[0],
            purpose: post.forSaleOrRent,
            price: post.price,
            priceType: post.priceType,
            area: post.area,
            bathroom: post.bathroomNumber,
            bedroom: post.bedroomNumber,
            ownerName: post.owner.name,
            ownerPhone: post.owner.phone,
            publishDate: post.publishedDate,
            slug: post.slug,
          }
          if (randomEstates.length < 6) {
            randomEstates.push(obj)
          }
        })


        setRelatedPosts(randomEstates)
      })
    }
    ,[])
  const { owner } = props.post
  return (
    <>
      <Header />

      <div
        className={`${style.default} sm:w-[1200px] grid grid-full mx-auto my-3 sm:flex rounded-lg border-black overflow-clip`}
      >
        <div className="container sm:w-3/4 sn:flex-initial" id="mainContent">
          <PostContent post={props.post} />

          <div>
            <p className="text-base font-bold">
              Tìm kiếm theo từ khóa liên quan
            </p>
            <div className="flex-nowrap space-y-2 p-2">
              <div className="bg-gray-200 px-4 py-1 rounded-xl w-fit">
                <p>Bất động sản {props.post.location.CityName}</p>
              </div>
              <div className="bg-gray-200 px-4 py-1 rounded-xl w-fit">
                <p>
                  Bất động sản {props.post.location.DistrictPrefix}{" "}
                  {props.post.location.DistrictName}
                </p>
              </div>
              <div className="bg-gray-200 px-4 py-1 rounded-xl w-fit">
                <p>
                  Bất động sản {props.post.location.WardPrefix}{" "}
                  {props.post.location.WardName}
                </p>
              </div>
              <div className="bg-gray-200 px-4 py-1 rounded-xl w-fit">
                <p>
                  Bất động sản {props.post.location.StreetPrefix}{" "}
                  {props.post.location.StreetName}
                </p>
              </div>
            </div>
            
          </div>

          <div>
            <p className="text-base font-bold my-2">Bất động sản dành cho bạn</p>
          </div>
          <Carousel showArrows={true} 
            showStatus={false}
            swipeable={true}
            emulateTouch={true}
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
            // renderArrowNext={(clickHandler: () => void, hasPrev: boolean, label: string) => {
            //   return <>
            //   <div><ChevronRightIcon className="w-8 h-8 text-red absolute right-0 z-100" onClick={clickHandler}/></div>
            //   </>
              
            // }}
            // showThumbs={showThumbs}
            // onClickItem={onClick}
            // className={className}
            >
            {relatedPosts.map( val => {
                return <EstateCard 
                key={val?._id}
                id={val?._id}
                title= {val?.name}
                imageUrl = {val.thumbnail}
                price = {val.price}
                priceType = {val.priceType}
                areaSqr = {val.area}
                rooms = {val.bedroom + val.bathroom}
                address = {val.address}
                author = {val.ownerName}
                slug = {val.slug}
                estateType = {val.estateType}
                purpose = {val.purpose}
                titleColor = {val.titleColor}
                author_phone_number = {val.ownerPhone}
                style={''}
                />
                
              })}
        </Carousel>
        </div>

        <div className="md:border-gray-300 md:w-1/4 md:ml-1 relative">
          <div className="md:h-[50vh] container md:rounded-top-xl flex md:flex-col md:justify-center items-center justify-around ml-3">
            <div className="w-20 h-20 rounded-full bg-[#FF6263] inline-flex items-center justify-center">
              <p>{owner.name.split(" ")[0][0]}</p>
            </div>
            <p className="text-sm mt-1 font-light">Được đăng bởi</p>
            <p className="my-1 font-bold">{owner.name}</p>
            <a className="cursor-pointer italic text-sm">
              Xem thêm bài đăng khác
            </a>
            <a
              href={`tel:${owner.phone}`}
              className="z-1 mt-3 fixed bg-[#207398] px-8 py-2 text-white rounded-md bottom-5 left-1/2 sm:static"
            >
              <div className="inline-flex items-center justify-between w-full h-full">
                <span className="material-icons mr-4">call</span>
                {owner.phone}
              </div>
            </a>
          </div>

          <div className="sticky top-16 left-0 right-0">
            <Image
              height={200}
              width={400}
              alt="ad_banner"
              className="cursor-pointer"
              src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552234/real-estate/banner-bat-dong-san-21_hhu8dh.jpg"
            />
            <Image
              height={800}
              width={400}
              alt="ad_banner"
              className="cursor-pointer"
              src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552342/real-estate/banner-bat-dong-san-6_hgeevs.jpg"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default EstateDetail

interface IPathParam {
  params: {
    estateTypeSlug: string
    estatePostSlug: string
  }
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let slugs = new Array<IPathParam>()
  const res = await fetch(
    "http://vn-real-estate-api.herokuapp.com/api/post/slug"
  )
  try{
    const data = await res.json()
    slugs = data.slugs
    console.log(slugs)
  }
  catch(err: any){
    console.log(err)
  }
  
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: slugs, fallback: false }
}

export async function getStaticProps(pathParam: IPathParam) {
  const { params } = pathParam
  let post = new Array<IPost>()
  try {
    const res = await fetch(`${server}/post/slug?slug=${params.estatePostSlug}`)
    const data = await res.json()
    post = data.post
    console.log(post)
  }
  catch(err: any){
    console.log(err)
  }
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
    revalidate: 900,
  }
}
