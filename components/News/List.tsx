import Image from "next/image"
import Link from "next/link"
import moment from "moment"
import "moment/locale/vi"
import News from "../../interfaces/news"

interface Props {
  title: string
  news: News[]
}

const ListNews = ({ title, news }: Props) => {
  moment.locale("vi")

  return (
    <div className="p-4 md:container md:mx-auto md:px-36">
      <div className="w-5/12 border-b-2 border-red-700">
        <h2 className="font-bold">{title.toUpperCase()}</h2>
      </div>
      <div className="flex space-x-4 relative">
        <div className="md:w-9/12 pt-4">
          {/* <div className="columns-3">
            <div className="break-afer-column">
              <Image
                height={200}
                width={400}
                alt="ad_banner"
                className="cursor-pointer"
                src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552234/real-estate/banner-bat-dong-san-21_hhu8dh.jpg"
              />
              <p className="text-xs cursor-pointer">
                TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022
              </p>
            </div>
            <div className="break-after-column">
              <Image
                height={200}
                width={400}
                alt="ad_banner"
                className="cursor-pointer"
                src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552234/real-estate/banner-bat-dong-san-21_hhu8dh.jpg"
              />
              <p className="text-xs cursor-pointer">
                TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022
              </p>
            </div>
            <div className="">
              <Image
                height={200}
                width={400}
                alt="ad_banner"
                className="cursor-pointer"
                src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552234/real-estate/banner-bat-dong-san-21_hhu8dh.jpg"
              />
              <p className="text-xs cursor-pointer">
                TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022
              </p>
            </div>
          </div> */}
          <div className="space-y-4 pt-2">
            {news.map((n) => {
              return (
                <div key={n._id} className="md:flex space-x-4">
                  <div className="w-12/12 md:w-6/12">
                    <Image
                      className="rounded-md"
                      alt="alt"
                      src={n.thumbnail}
                      height={500}
                      width={900}
                    />
                  </div>
                  <div className="w-12/12 md:w-6/12 text-sm relative">
                    <span className="font-semibold text-base text-red-600 text-xs">
                      {title}
                    </span>
                    <Link href={`/tin-tuc/${n.type}/${n.slug}`} passHref>
                      <h3 className="font-bold text-xl cursor-pointer hover:text-gray-400">
                        {n.title}
                      </h3>
                    </Link>
                    <p className="text-base">
                      {n.description.length > 200
                        ? n.description.slice(0, 200) + " ..."
                        : n.description}
                    </p>
                    <p className="text-md self-end absolute bottom-2 right-0">
                      {moment(n.submitday).fromNow()} - {n.author}
                    </p>
                  </div>
                </div>
              )
            })}
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
    </div>
  )
}

export default ListNews
