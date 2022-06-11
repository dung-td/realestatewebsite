import type { GetServerSideProps } from "next"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import City from "../components/Home/City"
import NewsSection from "../components/News/Section"
import ListEstateOnHome from "../components/Estate/ListEstateOnHome"
import ListProjectOnHome from "../components/Estate/ListProjectOnHome"

import { Province } from "../interfaces/Province"
import server from "../interfaces/server"
import News from "../interfaces/news"

import Item from "../components/User/Transaction/Item"
import { Search } from "../interfaces/search"

type Props = {
  estateOnHome: any[]
  projectOnHome: any[]
}

const Home = ({ estateOnHome, projectOnHome }: Props) => {
  const router = useRouter()
  const [news, setNews] = useState<Array<News>>(new Array())

  useEffect(() => {
    fetch(`${server}/news/popular?limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data)
      })
  }, [])

  const searchCallback = (search: Search) => {
    console.log(search)
    router.push({
      pathname: "/tin-dang",
      query: {
        "keyword": "",
        "province": search.province,
        "district": search.district,
        "ward": search.ward,
        "street": search.street,
        "project": search.project,
        "priceMin": search.price?.min,
        "priceMax": search.price?.max,
        "areaMin": search.area?.min,
        "areaMax": search.area?.max,
        "type": search.type,
        "bedroomMin": search.bedroom?.min,
        "bedroomMax": search.bedroom?.max,
        "widthMin": search.width?.min,
        "widthMax": search.width?.max,
        "saleOrRent": search.saleOrRent,
        "streetWidthMin": search.streetWidth?.min,
        "streetWidthMax": search.streetWidth?.max,
        "orientation": search.orientation,
        "projectStatus": search.projectStatus,
      },
    })
  }

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
          <div className="px-4 md:w-full ml-auto mr-auto md:absolute md:top-10">
            <SearchBar callback={searchCallback} />
          </div>
        </div>

        {/* Section */}
        <div className=" space-y-16">
          {news.length > 0 ? (
            <NewsSection typeSlug="tin-noi-bat" news={news} />
          ) : null}

          <City />

          <ListEstateOnHome posts={estateOnHome} />
          <ListProjectOnHome posts={projectOnHome} />
        </div>
      </div>

      <div className="h-96"></div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { estateOnHome } = await getPost()
  const { projectOnHome } = await getProject()

  return {
    props: { estateOnHome, projectOnHome },
  }
}

const getPost = async () => {
  const fetchPost = await fetch(`${server}/post/get?stt=approved&limit=3`)
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

const getProject = async () => {
  const fetchPrj = await fetch(`${server}/project/get?limit=3`)
  let posts = await fetchPrj.json()

  posts = posts.data
  let projectOnHome = new Array()

  posts.forEach((post: any) => {
    let obj = {
      _id: post._id,
      name: post.name,
      address: post.location.DistrictName + ", " + post.location.CityName,
      projectType: post.projectType,
      projectStatus: post.projectStatus,
      thumbnail: post.images[0],
      price: post.price,
      area: post.area,
      titleColor: post.postType.title_color,
      slug: post.slug,
    }
    if (projectOnHome.length < 6) {
      projectOnHome.push(obj)
    }
  })

  return { projectOnHome }
}

export default Home
