import { useState, useEffect } from "react"

import ListNews from "../../components/News/List"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

import server from "../../interfaces/server"
import News from "../../interfaces/news"

type Props = {
  news: News[]
}

const NewsDetail = ({ news }: Props) => {
  const [title, setTitle] = useState("Tin nổi bật")

  return (
    <>
      <Header />

      <div className="mt-8 min-h-screen">
        <ListNews title={title} news={news} />
      </div>

      <Footer />
    </>
  )
}

export default NewsDetail

interface IPathParam {
  params: {
    newsTypeSlug: string
  }
  title: string
}

export async function getServerSideProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/news/popular?limit=10`)
  let data = await res.json()
  let posts = data.data

  // console.log(slugs)
  return { props: { news: posts } }
}
