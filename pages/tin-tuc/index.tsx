import type { NextPage, GetServerSideProps } from "next"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../../components/admin/Header"
import NewsSection from "../../components/News/Section"
import ListNews from "../../components/News/List"

import server from "../../interfaces/server"
import News from "../../interfaces/news"

type Props = {
  news: News[]
}

const NewsHome = ({ news }: Props) => {
  return (
    <>
      <Header />

      <div className="space-y-16 mt-8">
        {news.length > 0 ? <NewsSection news={news} /> : null}

        <ListNews news={news} title="Tin nổi bật" />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Getting news
  console.log("Getting news....")
  const res = await fetch(`${server}/news/get`)
  // console.log(await res.json())
  let data = await res.json()
  let news = new Array()
  data = data.data
  data.forEach((n: any) => {
    news.push(n)
  })

  return { props: { news } }
}

export default NewsHome
