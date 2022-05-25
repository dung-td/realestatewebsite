import type { GetServerSideProps } from "next"
import Image from "next/image"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import City from "../components/Home/City"
import NewsSection from "../components/News/Section"
import ListEstateOnHome from "../components/Estate/ListEstateOnHome"
import { useState } from "react"
import { Province } from "../interfaces/Province"
import server from "../interfaces/server"
import News from "../interfaces/news"

type Props = {
  news: News[]
  postCounts: any[]
  provinces: Province[]
  smallProvinces: Province[]
}

const Home = ({ postCounts, provinces, smallProvinces, news }: Props) => {
  const [scrollTop, setScrollTop] = useState(0)

  return (
    <div className="relative">
      <Header />

      {/* Search bar */}
      <div className="grid-full">
        <div className="relative mb-8">
          <div className="home-banner">
            <img
              alt="banner"
              src="https://phathung.vn/wp-content/uploads/2019/02/ecogreen-banner.jpg"
            />
          </div>
          <div className="w-4/5 ml-auto mr-auto md:absolute md:w-full md:top-10">
            <SearchBar provinces={provinces} />
          </div>
        </div>

        {/* Section */}
        <div className="space-y-16">
          <NewsSection news={news} />

          <City postCounts={postCounts} smallProvines={smallProvinces} />

          <ListEstateOnHome />
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
  return { props: { postCounts, provinces, smallProvinces, news } }
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
  while (count < 7) {
    let i = Math.floor(Math.random() * (63 - 0 + 1) + 0)

    if (!bigCites.includes(provinces[i])) {
      smallProvinces.push(provinces[i])
      count++
    }
  }

  return { postCounts, provinces, smallProvinces }
}

const getNews = async () => {
  const res = await fetch(`${server}/news/get`)

  let data = await res.json()
  data = data.data

  let news = new Array()
  data.forEach((n: any) => {
    news.push(n)
  })

  return { news }
}

export default Home
