import type { NextPage } from "next"
import { useState } from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Sidebar from "../../components/User/Sidebar"

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <Sidebar />

      <Footer />
    </>
  )
}

export default Home
