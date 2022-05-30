import type { NextPage, GetServerSideProps } from "next"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../../components/Header"
import NewsSection from "../../components/News/Section"
import ListNews from "../../components/News/List"
import server from "../../interfaces/server"
import News from "../../interfaces/news"

type Props = {
  popularNews: News[]
}

const NewsHome = ({ popularNews }: Props) => {
  return (
    <>
      <Header />

      <div className="space-y-16 mt-8">
        {popularNews.length > 0 ? (
          <NewsSection typeSlug="tin-noi-bat" news={popularNews} />
        ) : null}

        {/* <ListNews news={news} title="Tin nổi bật" /> */}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Getting news
  const popularNews = await (await getPopularNews()).news
  return { props: { popularNews } }
}

const getPopularNews = async () => {
  const res = await fetch(`${server}/news/popular?limit=7`)
  let data = await res.json()
  const news = data.data

  return { news }
}

export default NewsHome
