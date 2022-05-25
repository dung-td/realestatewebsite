import { useState } from "react"

import Detail from "../../../components/News/Detail"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"

import server from "../../../interfaces/server"
import News from "../../../interfaces/news"

type Props = {
  news: News
}

const NewsDetail = ({ news }: Props) => {
  return (
    <>
      <Header />

      <div className="mt-8">
        <Detail news={news} />
      </div>
      <Footer />
    </>
  )
}

export default NewsDetail

interface IPathParam {
  params: {
    newsTypeSlug: string
    newSlug: string
  }
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/news/slug`)
  let data = await res.json()
  let slugs = data.data
  return { paths: slugs, fallback: false }
}

export async function getStaticProps(pathParam: IPathParam) {
  const { params } = pathParam
  const res = await fetch(`${server}/news/get?slug=${params.newSlug}`)
  let data = await res.json()
  let news = data.data
  // console.log(news)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      news,
    },
  }
}
