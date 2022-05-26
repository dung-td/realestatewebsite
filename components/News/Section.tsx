import { useState } from "react"
import Image from "next/image"
import moment from "moment"
import "moment/locale/vi"

import server from "../../interfaces/server"
import News from "../../interfaces/news"
import Link from "next/link"

type Props = {
  news: News[]
}

const NewsSection = ({ news }: Props) => {
  moment.locale("vi")

  return (
    <div className="md:container md:mx-auto grid">
      <div className="md:w-5/12 border-b-2 border-red-700">
        <h2 className="font-bold text-base">TIN TỨC NỔI BẬT</h2>
      </div>
      <div className="md:flex pt-4 space-x-6">
        <div className="w-12/12 md:w-5/12 space-y-2">
          <Image
            className="rounded-md"
            alt="tieu-diem-thi-truong-title-img"
            height={300}
            width={600}
            src={news[0].thumnail}
          />
          <Link
            href={`tin-tuc/${news[0].type}/${news[0].slug}`}
            passHref={true}
          >
            <h3 className="font-medium text-xl hover:text-gray-400 cursor-pointer">
              {news[0].title}
            </h3>
          </Link>
          <p className="text-md">
            {moment(news[0].submitday).fromNow()} - {news[0].author}
          </p>
          <p className="text-base">{news[0].description}</p>
        </div>

        <div className="w-12/12">
          <div className="cursor-pointer ml-auto">
            <p className="text-right text-red-600 hover:text-red-400 p-2">
              Xem thêm
            </p>
          </div>
          <div className=" divide-y space-y-4">
            {news.map((n) => {
              return (
                <div key={n._id} className="hover:text-gray-400 cursor-pointer">
                  <Link
                    href={`tin-tuc/${n.type}/${n.slug}`}
                    passHref={true}
                  >
                    <p>{n.title}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        <div className="hidden break-before-column w-4/12">
          <img
            className="cursor-pointer"
            id="ads img"
            alt="anh-quang-cao-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"
          ></img>
        </div>
      </div>
    </div>
  )
}

export default NewsSection
