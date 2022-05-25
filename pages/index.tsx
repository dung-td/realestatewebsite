import type { NextPage, GetServerSideProps } from "next"
import Image from "next/image"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import City from "../components/Home/City"
import ListEstateOnHome from "../components/Estate/ListEstateOnHome"
import { useState } from "react"
import { Province } from "../interfaces/Province"
import server from "../interfaces/server"
import MoneyFormat from "../util/MoneyFormat"


type Props = {
  postCounts: any[]
  provinces: Province[]
  smallProvinces: Province[]
  estateOnHome: any[]
}

const Home = ({ postCounts, provinces, smallProvinces, estateOnHome }: Props) => {
  const [scrollTop, setScrollTop] = useState(0)
  

  return (
    <div className="relative">
      <Header />

      <div className="grid-full">
        <div className="relative">
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

        <City postCounts={postCounts} smallProvines={smallProvinces} />

        {/* ELEMENTS GO HERE PLEASE */}
        <ListEstateOnHome posts={estateOnHome}/>

      </div>

      <div className="h-96"></div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Getting provinces
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

  // Load estate cards
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
        price: MoneyFormat(post.price) + " " + post.priceType,
        area: post.area,
        bathroom: post.bathroomNumber,
        bedroom: post.bedroomNumber,
        ownerName: post.owner.name,
        ownerPhone: post.owner.phone,
        publishDate: post.publishedDate,
        titleColor: post.postType.title_color,
        slug: post.slug
    }
    if (estateOnHome.length < 6) {
      estateOnHome.push(obj)
    }
  })

  // Getting big province count

  return { props: { postCounts, provinces, smallProvinces, estateOnHome } }
}

const getSmallProvince = () => {}

export default Home
