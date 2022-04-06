import type { NextPage } from "next"
import next from "next"
import Image from "next/image"
import HoChiMinh from "../public/img/hochiminh.png"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import Link from "next/link"
import Script from "next/script"

const Home: NextPage = () => {
  return (
    <>
      <SearchBar />
    </>
  )
}

export default Home
