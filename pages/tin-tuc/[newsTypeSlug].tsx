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
  const [title, setTitle] = useState("")
  useEffect(() => {
    let isCancelled = false
    if (news.length > 0) {
      fetch(`${server}/news/type?slug=${news[0].type}`)
        .then((res) => res.json())
        .then((data) => {
          let d = data.data
          setTitle(d.name)
        })
    }
    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <>
      <Header />

      <div className="mt-8 min-h-screen">
        {news.length > 0 ? (
          <ListNews title={title} news={news} />
        ) : (
          <div className="grid text-center font-bold">
            {" "}
            Hiện tại không có tin tức nào rồi, quay lại sau bạn nhé : (
          </div>
        )}
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

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/news/type`)
  let data = await res.json()
  data = data.data
  let slugs = new Array()
  data.forEach((n: any) => {
    if (n.slug != "tin-noi-bat") {
      let obj = {
        params: {
          newsTypeSlug: n.slug,
        },
      }
      slugs.push(obj)
    }
  })
  // console.log(slugs)
  return { paths: slugs, fallback: false }
}

export async function getStaticProps(pathParam: IPathParam) {
  const { params } = pathParam
  console.log(params)
  const res = await fetch(`${server}/news/get?typeslug=${params.newsTypeSlug}`)
  let data = await res.json()
  const news = data.data
  console.log(news)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      news,
    },
  }
}
