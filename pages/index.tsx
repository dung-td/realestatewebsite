import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import ModalDangNhap from "../components/dang-nhap"
import ModalDangKy from "../components/dang-ky"

const Home: NextPage = () => {
  return <>
    <ModalDangNhap></ModalDangNhap>
    <ModalDangKy></ModalDangKy>
  </>
}

export default Home
