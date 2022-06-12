import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Province } from "../../interfaces/Province"
import server from "../../interfaces/server"

interface Props {
  callback: any
}

const City = ({ callback }: Props) => {
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

  const [smallProvines, setSmallProvines] = useState(new Array())

  // Get count posts
  useEffect(() => {
    let isCancelled = false
    smallPopularCity[0].map((city) => {
      fetch(`${server}/post/count?cityCode=${city.value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            city.postCount = data.data
          }
        })
    })
    return () => {
      isCancelled = true
    }
  }, [])
  useEffect(() => {
    let isCancelled = false
    fetch(`${server}/post/count?cityCode=SG`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPostCountSG(data.data)
        }
      })
    return () => {
      isCancelled = true
    }
  }, [])

  // Get small provices
  useEffect(() => {
    let isCancelled = false
    fetch(`${server}/a/province/get`)
      .then((res) => res.json())
      .then((data) => {
        let provinces = data.data
        let popular = ["SG", "HN", "DN", "DDN", "BD"]
        let small = new Array()

        provinces.forEach((p: any) => {
          if (small.length < 6) {
            if (!popular.includes(p._id)) {
              small.push(p)
            }
          } else return
        })
        setSmallProvines(small)
      })
    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div className="mt-8 p-8">
      <div className="grid">
        <h3 className="font-bold text-sm sm:text-base">
          BẤT ĐỘNG SẢN Ở THÀNH PHỐ LỚN
        </h3>
        <div className="border-b-2 border-indigo-500 w-full mb-4"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link passHref href={`/tin-dang?province=SG`}>
          <div className="cursor-pointer hovereffect xl:row-span-2 xl:col-span-2 aspect-w-16 aspect-h-9 pointer">
            <Image
              alt="Hồ Chí Minh"
              height="420"
              width="600"
              className="w-full  rounded-lg"
              src="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-2.jpg"
            />
            <div className="overlay">
              <h2 className="text-base font-semibold">TP. Hồ Chí Minh</h2>
              <p>
                <a className="mt-4" href="#">
                  {postCountSG} tin đăng
                </a>
              </p>
            </div>
          </div>
        </Link>
        {smallPopularCity[0].map((city) => {
          return (
            <Link
              key={city.value}
              passHref
              href={`/tin-dang?province=${city.value}`}
            >
              <div className="cursor-pointer hovereffect aspect-w-16 aspect-h-9 pointer">
                <Image
                  alt={city.label}
                  height="410"
                  width="600"
                  className="w-full  rounded-lg"
                  src={city.img}
                />
                <div className="overlay">
                  <h2 className="text-base font-semibold">{city.label}</h2>
                  <p>
                    <a className="mt-4" href="#">
                      {city.postCount} tin đăng
                    </a>
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid px-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6 gap-4 mt-4">
        {smallProvines.map((province) => (
          <Link
            href={`/tin-dang?province=${province._id}`}
            key={province.slug}
            passHref
          >
            <div className="bg-slate-200 rounded-xl p-1 cursor-pointer">
              <p className="text-center">{province.provinceName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default City
