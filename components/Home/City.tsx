import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Province } from "../../interfaces/Province"
import server from "../../interfaces/server"

type Props = {
  smallProvines: Province[]
}

const City = () => {
  const [postCountSG, setPostCountSG] = useState(0)
  const smallPopularCity = useState<Province[]>([
    {
      label: "Hà Nội",
      slug: "ha-noi",
      postCount: 0,
      value: "HN",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/HN-web-3.jpg",
    },
    {
      label: "Đà Nẵng",
      slug: "da-nang",
      postCount: 0,
      value: "DDN",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/DDN-web-1.jpg",
    },
    {
      label: "Bình Dương",
      slug: "ha-noi",
      postCount: 0,
      value: "BD",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/BD-web-1.jpg",
    },
    {
      label: "Đồng Nai",
      slug: "ha-noi",
      postCount: 0,
      value: "DN",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/DNA-web-3.jpg",
    },
  ])

  // useEffect(() => {
  //   let isCancelled = false
  //   smallPopularCity[0].map((city) => {
  //     fetch(`${server}/post/count?cityCode=${city.value}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.data) {
  //           city.postCount = data.data
  //         }
  //       })
  //   })
  //   return () => {
  //     isCancelled = true
  //   }
  // }, [])

  // useEffect(() => {
  //   let isCancelled = false
  //   fetch(`${server}/post/count?cityCode=SG`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         setPostCountSG(data.data)
  //       }
  //     })
  //   return () => {
  //     isCancelled = true
  //   }
  // }, [])

  return (
    <div className="mt-8 p-8">
      <div className="grid">
        <h3 className="font-bold text-sm sm:text-base">
          BẤT ĐỘNG SẢN Ở THÀNH PHỐ LỚN
        </h3>
        <div className="border-b-2 border-indigo-500 w-1/4 mb-4"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link passHref href="/ho-chi-minh">
          <div className="img-hover-zoom city-container relative xl:row-span-2 xl:col-span-2 aspect-w-16 aspect-h-9">
            <div className="absolute todiv-0 left-0 p-2 city-title z-10">
              <p className="text-base font-semibold hover:underline uppercase">
                TP. Hồ Chí Minh
              </p>
              <p className="text-s hover:underline">{postCountSG} tin đăng</p>
            </div>
            <Image
              alt="Hồ Chí Minh"
              height="410"
              width="600"
              className="w-full  rounded-lg"
              src="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-2.jpg"
            />
          </div>
        </Link>
        {smallPopularCity[0].map((city) => {
          return (
            <Link key={city.value} passHref href="/ho-chi-minh">
              <div className="img-hover-zoom city-container relative aspect-w-16 aspect-h-9">
                <div className="absolute todiv-0 left-0 p-2 city-title z-10">
                  <p className="text-sm font-semibold hover:underline uppercase">
                    {city.label}
                  </p>
                  <p className="text-xs hover:underline">
                    {city.postCount} tin đăng
                  </p>
                </div>
                <Image
                  height="410"
                  width="600"
                  alt={city.label}
                  className="w-full object-cover rounded-lg"
                  src={city.img}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* <div className="grid px-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6 gap-4 mt-4">
        {smallProvines.map((province) => (
          <a
            key={province.slug}
            href={province.slug}
            className="bg-slate-200 rounded-xl p-1"
          >
            <p className="text-center">{province.label}</p>
          </a>
        ))}
      </div> */}
    </div>
  )
}

export default City
