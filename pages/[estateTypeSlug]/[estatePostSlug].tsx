import { useState } from "react"
import type { NextPage } from "next"
import ImageCarousel from "../../components/EstateDetail/ImageCarousel"
import DetailBox from "../../components/EstateDetail/DetailBox"
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
  const { owner } = props.post
  return (
    <>
      <Header />

      <div className={`${style.default} sm:w-[1200px] grid mx-auto my-3 sm:flex rounded-lg border-black overflow-clip`}>
        <div className="container sm:w-3/4 sn:flex-initial" id="mainContent">
          <PostContent post={props.post} />
        </div>
        <div className="md:border-gray-300 md:px-2 md:w-1/4 md:ml-1" id="sideContent">
          <div className="md:h-[50vh] container md:p-4 md:border md:border-gray-300 md:rounded-xl flex md:flex-col md:justify-center items-center justify-around">
            {/* {owner.avatar? 
            <img
              className="w-20 h-20 rounded-full bg-cyan-500"
              src={owner.avatar}
            /> : */}
            <img
              className="w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-cyan-500 object-fill"
              src='http://cdn.onlinewebfonts.com/svg/img_299586.png'
            />
            <p className='hidden sm:block text-xs py-4'>Được đăng bởi</p>
            <p className="text-base font-bold">{owner.name}</p>
            <a className="text-sm cursor-pointer">Xem thêm bài đăng khác</a>
            <a
              href={`tel:${owner.phone}`}
              className="z-50 mt-3 fixed sm:w-[100%] bg-cyan-500 p-3 text-white rounded-xl bottom-5 left-1/2 sm:static sm:z-auto"
            >
              <div className="flex justify-center">
              <PhoneIcon className="inline h-4 w-4 m-1" />
              {owner.phone}
              </div>
            </a>
          </div>

          <div>
            <div className="md:h-[50vh] container md:border md:border-gray-300 md:rounded-md flex md:flex-col md:justify-center items-center justify-around mt-2">
              <p>Bất động sản</p>
            </div>
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
    const res = await fetch('http://vn-real-estate-api.herokuapp.com/api/post/slug')
    const data = await res.json()
    const {slugs} = data
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
