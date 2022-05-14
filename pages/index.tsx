import type { NextPage, GetServerSideProps } from "next"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import City from "../components/Home/City"
import ListEstateOnHome from "../components/Estate/ListEstateOnHome"
import ListEstate from "../components/Estate/ListEstate"
import UploadPost from "../components/UploadPost"
import ChangePassword from "../components/User/Account/ChangePassword"
import { useState } from "react"
import { Province } from "../interfaces/Province"
import server from "../interfaces/server"
import Map from "../components/Map"
import EditInformation from "../components/User/Account/EditInformation"

type Props = {
  provinces: Province[]
}

const Home = ({ provinces }: Props) => {
  const [scrollTop, setScrollTop] = useState(0)

  const onScroll = () => {
    const scrollY = window.scrollY
    console.log(`onScroll`)
  }

  const onCallBackMap = (lat: number, lng: number) => {
    console.log(lat + "/" + lng)
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

        <City provinces={provinces} />

        {/* ELEMENTS GO HERE PLEASE */}
        <UploadPost post_type="" provinces={provinces}/>
        <ListEstate/>
        <ListEstateOnHome/>
        {/* <EditInformation/> */}
        
      </div>

      <div className="h-96"></div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("Getting post list from Server...")
  const res = await fetch(`${server}/a/province/get`)
  let data = await res.json()
  data = data.data
  let provinces = new Array()
  let bigCity = ["SG", "HN", "DDN", "BD", "DN"]
  data.forEach((province: any) => {
    let obj = {
      value: province._id,
      label: province.provinceName,
      slug: province.slug,
    }

    provinces.push(obj)
  })
  return { props: { provinces } }
}

export default Home
