import type { NextPage, GetServerSideProps } from "next"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import { useState } from "react"

import { Province } from "../interfaces/Province"

type Props = {
  provinces: Province[]
}

const Home = ({ provinces }: Props) => {
  const [scrollTop, setScrollTop] = useState(0)

  const onScroll = () => {
    const scrollY = window.scrollY
    console.log(`onScroll`)
  }

  return (
    <div onScroll={onScroll}>
      <Header />

      <div className="grid-full">
        <div className="relative">
          <div className="home-banner">
            <img src="https://phathung.vn/wp-content/uploads/2019/02/ecogreen-banner.jpg" />
          </div>
          <div className="w-4/5 ml-auto mr-auto md:absolute md:w-full md:top-10">
            <SearchBar provinces={provinces} />
          </div>
        </div>

        {/* ELEMENTS GO HERE PLEASE */}
      </div>

      <div className="h-96"></div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("Getting post list from Server...")
  const res = await fetch(`http://localhost:3031/api/a/province/get`)
  let data = await res.json()
  data = data.data
  let provinces = new Array()
  let disctricts = new Array()
  data.forEach((province: any) => {
    let obj = {
      value: province._id,
      label: province.provinceName,
      disctricts: disctricts,
    }

    provinces.push(obj)
  })
  return { props: { provinces } }
}

export default Home
