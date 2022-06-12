import { useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import ImageCarousel from "../../components/EstateDetail/ImageCarousel"
import DetailBox from "../../components/EstateDetail/DetailBox"
import CollapseDescription from "../../components/EstateDetail/CollapseDescription"
import { HeartIcon, ClockIcon, HomeIcon } from "@heroicons/react/outline"
import { PhoneIcon } from "@heroicons/react/solid"
import { Unit } from "../../Enum"
import style from "../../public/css/Estate.module.css"
import ProjectContent from "../../components/ProjectDetail/ProjectContent"
import ProjectDTO from "../../interfaces/ProjectDTO"
import server from "../../interfaces/server"

import Header from "../../components/Header"
import Footer from "../../components/Footer"

interface TitleSectionProps {
  title: string
  issuedDate?: string
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
interface IProject {
  project: ProjectDTO
}
const EstateProject: NextPage<IProject> = (props) => {
  const { investor } = props.project
  const project = props.project
  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      <Header />
      <div
        className={`${style.default} sm:w-[1200px] grid mx-auto my-3 sm:flex rounded-lg border-black overflow-clip`}
      >
        <div className="container sm:w-3/4 sn:flex-initial" id="mainContent">
          <ProjectContent project={props.project} />
        </div>
        <div className="md:px-2 md:w-1/4 md:ml-1 md:mb-16" id="sideContent">
          <div className="md:h-max container md:p-4 flex md:flex-col md:justify-center items-center justify-around">
            <div className="w-20 h-20 rounded-full bg-[#FF6263] inline-flex items-center justify-center">
              <p>{investor.name.split(" ")[0][0]}</p>
            </div>
            <p className="hidden sm:block text-xs py-4">Được đăng bởi</p>
            <p className="text-base font-bold">{investor.name}</p>
            <a className="text-sm cursor-pointer">Xem thêm bài đăng khác</a>
            <a
              href={`tel:${investor.phone}`}
              className="z-1 mt-3 fixed bg-[#207398] px-8 py-2 text-white rounded-md bottom-5 left-1/2 sm:static"
            >
              <div className="inline-flex items-center justify-between w-full h-full">
                <span className="material-icons mr-4">call</span>
                {investor.phone}
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
            <Image
              height={300}
              width={400}
              alt="ad_banner"
              className="cursor-pointer"
              src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1654930836/real-estate/banner-bat-dong-san-17_oezrw4.jpg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default EstateProject

interface IPathParam {
  params: {
    estateProjectSlug: string
  }
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let slugs = new Array<IPathParam>()
  // try{
    const res = await fetch(
      "http://vn-real-estate-api.herokuapp.com/api/project/slug"
    )
    const data = await res.json()
    slugs = data.data
  // }
  // catch(err: any)
  // {
  //   console.log('There is error', err)
  // }
  // const slugs = posts.map( (el: { slug: any }) => { return { params: {
  //     estateProjectSlug: el.slug
  // }}})
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: slugs, fallback: false }
}

export async function getStaticProps(pathParam: IPathParam) {
  const { params } = pathParam
  let project = new Array<IProject>()
  try {
    const res = await fetch(
      `${server}/project/get?slug=${params.estateProjectSlug}`
    )
    const data = await res.json()
    project = data.data
  }
  catch (err: any)
  {
    console.log('There is error',err)
  }
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      project,
    },
    revalidate: 60,
  }
}
