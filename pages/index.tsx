import type { GetServerSideProps } from "next"
import { useState } from "react"
import Image from "next/image"
import Head from "next/head"

import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import City from "../components/Home/City"
import NewsSection from "../components/News/Section"
import ListEstateOnHome from "../components/Estate/ListEstateOnHome"

import { Province } from "../interfaces/Province"
import server from "../interfaces/server"
import News from "../interfaces/news"

type Props = {
  news: News[]
  postCounts: any[]
  provinces: Province[]
  smallProvinces: Province[]
  estateOnHome: any[]
}

const Home = ({
  postCounts,
  provinces,
  smallProvinces,
  news,
  estateOnHome,
}: Props) => {
  return (
    <div className="relative">
      <Header />

      {/* Search bar */}
      <div className="grid-full">
        <div className="relative mb-8">
          <div className="home-banner">
            <Image
              height={600}
              width={1920}
              alt="banner"
              src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552538/real-estate/bannerbatdongsan07_bl4gmn.jpg"
            />
          </div>
          <div className="w-3/5 ml-auto mr-auto md:absolute md:w-full md:top-10">
            <SearchBar provinces={provinces} />
          </div>
        </div>

        {/* Section */}
        <div className="space-y-16">
          <NewsSection typeSlug="tin-noi-bat" news={news} />

          <City postCounts={postCounts} smallProvines={smallProvinces} />
          {/* ELEMENTS GO HERE PLEASE */}

          <ListEstateOnHome posts={estateOnHome} />
        </div>
      </div>

      <div className="h-96"></div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Getting provinces
  const { postCounts, provinces, smallProvinces } = await getProvince()
  // Getting news
  const { news } = await getNews()
  const { estateOnHome } = await getPost()

  return {
    props: { postCounts, provinces, smallProvinces, news, estateOnHome },
  }
}

const getProvince = async () => {
  const res = await fetch(`${server}/a/province/get`)
  let data = await res.json()
  data = data.data
  let provinces = new Array()
  let smallProvinces = new Array()
  let bigCites = ["SG", "HN", "DDN", "BD", "DN"]
  data.forEach((province: any) => {
    let obj = {
      value: province._id,
      label: province.provinceName,
      slug: province.slug,
    }
    provinces.push(obj)
  })
  let count = 0
  let postCounts = new Array<any>()
  bigCites.forEach(async (city) => {
    const res = await fetch(`${server}/admin/post/count?p=${city}`)
    let data = await res.json()
    data = data.data
    postCounts.push(data)
  })
  while (count < 6) {
    let i = Math.floor(Math.random() * (63 - 0 + 1) + 0)

    if (!bigCites.includes(provinces[i])) {
      smallProvinces.push(provinces[i])
      count++
    }
  }

  return { postCounts, provinces, smallProvinces }
}

const getNews = async () => {
  const res = await fetch(`${server}/news/popular?limit=7`)

  let data = await res.json()
  data = data.data

  let news = new Array()
  data.forEach((n: any) => {
    news.push(n)
  })

  return { news }
}

const getPost = async () => {
  const fetchPost = await fetch(`${server}/post/get`)
  let posts = await fetchPost.json()

  posts = posts.data
  let estateOnHome = new Array()

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
      titleColor: post.postType.title_color,
      slug: post.slug,
    }
    if (estateOnHome.length < 6) {
      estateOnHome.push(obj)
    }
  })

  return { estateOnHome }
}

export default Home
