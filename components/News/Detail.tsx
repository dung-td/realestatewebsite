import { useEffect, useState } from "react"
import moment from "moment"
import "moment/locale/vi"
import Image from "next/image"

import News from "../../interfaces/news"
import server from "../../interfaces/server"

type Props = {
  news: News
}

const Detail = ({ news }: Props) => {
  moment.locale("vi")
  const [relatedNews, setRelatedNews] = useState<Array<News>>([])

  useEffect(() => {
    let isCancelled = false
    fetch(`${server}/news/get?limit=3`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedNews(data.data)
      })
    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div className="space-y-16 ">
      <div className="md:container md:mx-auto md:px-36 text-sm">
        <div className="flex space-y-4 space-x-8 relative">
          <div className="w-12/12 p-4 md:w-9/12 ml-auto">
            <div className="container space-y-2">
              <h1 className="text-3xl font-bold">{news.title}</h1>
              <p className="text-sm">
                {moment(news.submitday).format("DD/MM/YYYY, hh:mm")}
              </p>
              <p className="text-base font-semibold">{news.description}</p>
            </div>
            <div className="container pt-4 space-y-2 grid">
              {news.body.map((item) => {
                if (item.type == "text")
                  return (
                    <div key={item.src}>
                      {item.src.split("\n").map((para) => {
                        return (
                          <p className="mb-2 text-base" key={para}>
                            {para}
                          </p>
                        )
                      })}
                    </div>
                  )
                else if (item.type == "heading")
                  return (
                    <div key={item.src}>
                      {item.src.split("\n").map((para) => {
                        return (
                          <p className="mb-2 text-base font-bold" key={para}>
                            {para}
                          </p>
                        )
                      })}
                    </div>
                  )
                else
                  return (
                    <div className="py-2">
                      <Image
                        src={item.src}
                        layout="responsive"
                        height={800}
                        width={1200}
                        alt={item.src}
                      />
                    </div>
                  )
              })}
              <div className="w-fit pl-4 pr-4 rounded justify-self-end">
                Theo <span className="font-bold text-base">{news.author}</span>
              </div>
            </div>
          </div>

          <div className="invisible absolute md:visible md:relative md:w-3/12">
            <div className="sticky top-16 left-0 right-0">
              <Image
                height={200}
                width={400}
                alt="ad_banner"
                className="cursor-pointer"
                src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552234/real-estate/banner-bat-dong-san-21_hhu8dh.jpg"
              />
              <Image
                height={800}
                width={400}
                alt="ad_banner"
                className="cursor-pointer"
                src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552342/real-estate/banner-bat-dong-san-6_hgeevs.jpg"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-2 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-Rule="evenodd"
              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
              clip-Rule="evenodd"
            />
          </svg>
          <span className="bg-gray-200 pl-2 pr-2 rounded cursor-pointer">
            {news.tags}
          </span>
        </div>

        <div className="p-4 pt-4 container space-y-4 mb-8">
          <h2 className="text-lg font-bold border-red-500 w-60 border-l-8 border-b-2 pl-2">
            Bài viết khác
          </h2>
          <div className="md:flex space-x-2">
            {relatedNews?.map((news) => {
              return (
                <div key={news._id} className="w-full md:w-1/3 cursor-pointer">
                  <Image
                    className="h-auto w-full rounded"
                    alt="other-img"
                    height={400}
                    width={600}
                    src={news.thumbnail}
                  />
                  <div className="text-base p-2">
                    <p className="font-semibold hover:text-gray-400">
                      {news.title}
                    </p>
                    <p>{news.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
