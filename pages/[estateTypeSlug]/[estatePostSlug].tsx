import { useState, useEffect } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import CollapseDescription from "../../components/EstateDetail/CollapseDescription"
import { HeartIcon, ClockIcon, HomeIcon } from "@heroicons/react/outline"
import { PhoneIcon } from '@heroicons/react/solid'
import {Unit} from '../../Enum'
import PostContent from '../../components/EstateDetail/PostContent'
import PostDto from '../../interfaces/PostDTO'
import style from "../../public/css/Estate.module.css"
import server from "../../interfaces/server"

import Header from '../../components/Header'
import Footer from '../../components/Footer'
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

  const { owner } = props.post
  return (
    <>
      <Header />

      <div className={`${style.default} sm:w-[1200px] grid mx-auto my-3 sm:flex rounded-lg border-black overflow-clip`}>
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
                <p>Bất động sản {props.post.location.DistrictName}</p>
              </div>
              <div className="bg-gray-200 px-4 py-1 rounded-xl w-fit">
                <p>Bất động sản {props.post.location.WardName}</p>
              </div>
              <div className="bg-gray-200 px-4 py-1 rounded-xl w-fit">
                <p>Bất động sản đường {props.post.location.StreetName}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-base font-bold">Bất động sản dành cho bạn</p>
          </div>
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
  const res = await fetch(
    "http://vn-real-estate-api.herokuapp.com/api/post/slug"
  )
  const data = await res.json()
  const { slugs } = data
  console.log(slugs)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: slugs, fallback: false }
}

export async function getStaticProps (pathParam: IPathParam) {
    const { params } = pathParam
    const res = await fetch(`${server}/post/slug?slug=${params.estatePostSlug}`)
    const data = await res.json()
    const {post} =data
    console.log(post)
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        post,
      },
    }
}
