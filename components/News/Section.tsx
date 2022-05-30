import { useState } from "react"
import Image from "next/image"
import moment from "moment"
import "moment/locale/vi"

import server from "../../interfaces/server"
import News from "../../interfaces/news"
import Link from "next/link"

type Props = {
  typeSlug: string
  news: News[]
}

const NewsSection = ({ typeSlug, news }: Props) => {
  moment.locale("vi")

  return (
    <div className="md:container md:mx-auto grid p-8 md:p-0">
      <div className="md:w-5/12 border-b-2 border-red-700">
        <h2 className="font-bold text-base">TIN TỨC NỔI BẬT</h2>
      </div>
      <div className="md:flex pt-4 md:space-x-6">
        <div className="w-12/12 md:w-7/12 space-y-2">
          <Image
            className="rounded-md"
            alt="tieu-diem-thi-truong-title-img"
            height={300}
            width={600}
            src={news[0].thumbnail}
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
          <p className="text-base">
            {news[0].description.length > 200
              ? news[0].description.slice(0, 200) + " ..."
              : news[0].description}
          </p>
        </div>

        <div className="w-12/12 md:w-5/12">
          <div className="cursor-pointer ml-auto">
            <Link href={`/tin-tuc/${typeSlug}`} passHref={true}>
              <p className="text-right text-red-600 hover:text-red-400 p-2">
                Xem thêm
              </p>
            </Link>
          </div>
          <div className="divide-y space-y-4">
            {news.slice(1, news.length).map((n) => {
              return (
                <>
                  <div
                    key={n._id}
                    className="hover:text-gray-400 cursor-pointer"
                  >
                    <Link href={`tin-tuc/${n.type}/${n.slug}`} passHref={true}>
                      <p>{n.title}</p>
                    </Link>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div className="mt-4 w-full md:mt-0 md:w-4/12 ">
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
  )
}

export default NewsSection
