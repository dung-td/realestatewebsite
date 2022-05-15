import Link from "next/link"
import Image from "next/image"
import { Province } from "../../interfaces/Province"

type Props = {
  provinces: Province[]
  smallProvines: Province[]
}

const City = ({ provinces, smallProvines }: Props) => {
  const smallPopularCity = [
    {
      title: "HÀ NỘI",
      count: 1234,
      slug: "ha-noi",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/HN-web-3.jpg",
    },
    {
      title: "Bình Dương",
      count: 1234,
      slug: "binh-duong",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/BD-web-1.jpg",
    },
    {
      title: "Đà Nẵng",
      count: 1234,
      slug: "da-nang",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/DDN-web-1.jpg",
    },
    {
      title: "Đồng Nai",
      count: 1234,
      slug: "dong-nai",
      img: "https://file4.batdongsan.com.vn/images/newhome/cities1/DNA-web-3.jpg",
    },
  ]

  return (
    <div className="mt-8">
      <div>
        <h3 className="section-title font-bold text-sm sm:text-base md:text-lg lg:text-xl">
          BẤT ĐỘNG SẢN Ở THÀNH PHỐ LỚN
        </h3>
        <div className="seperate-line border-b-2 border-indigo-500 w-1/4 mb-4"></div>
      </div>
      <div className="grid px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link passHref href="/ho-chi-minh">
          <div className="img-hover-zoom city-container relative xl:row-span-2 xl:col-span-2 aspect-w-16 aspect-h-9">
            <div className="absolute todiv-0 left-0 p-2 city-title z-10">
              <p className="text-base font-semibold hover:underline uppercase">
                TP. Hồ Chí Minh
              </p>
              <p className="text-sm font-semibold hover:underline">
                182 tin đăng
              </p>
            </div>
            <Image
              alt="Hồ Chí Minh"
              height="400"
              width="600"
              className="w-full object-cover rounded-lg"
              src="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-2.jpg"
            />
          </div>
        </Link>
        {smallPopularCity.map((city) => {
          return (
            <Link key={city.slug} passHref href="/ho-chi-minh">
              <div className="img-hover-zoom city-container relative aspect-w-16 aspect-h-9">
                <div className="absolute todiv-0 left-0 p-2 city-title z-10">
                  <p className="text-base font-semibold hover:underline uppercase">
                    {city.title}
                  </p>
                  <p className="text-sm font-semibold hover:underline">
                    {city.count} tin đăng
                  </p>
                </div>
                <Image
                  layout="fill"
                  alt={city.title}
                  className="w-full object-cover rounded-lg"
                  src={city.img}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid px-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 gap-4 mt-4">
        {smallProvines.map((province) => (
          <a
            key={province.slug}
            href={province.slug}
            className="bg-slate-200 rounded-xl p-1"
          >
            <p className="text-center">{province.label}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default City
