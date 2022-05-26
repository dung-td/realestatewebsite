import Image from "next/image"
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
      <div className="flex space-x-4">
        <div className="md:w-8/12 pt-4">
          <div className="columns-3">
            <div className="break-afer-column">
              <img
                className="cursor-pointer"
                id=""
                alt="anh-tieude-img"
                src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"
              ></img>
              <p className="text-xs cursor-pointer">
                TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022
              </p>
            </div>
            <div className="break-after-column">
              <img
                className="cursor-pointer"
                id=""
                alt="anh-tieude-img"
                src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"
              ></img>
              <p className="text-xs cursor-pointer">
                TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022
              </p>
            </div>
            <div className="">
              <img
                className="cursor-pointer"
                id=""
                alt="anh-tieude-img"
                src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"
              ></img>
              <p className="text-xs cursor-pointer">
                TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-6">
            {news.map((n) => {
              return (
                <div key={n._id} className="md:flex space-x-4">
                  <div className="w-12/12 md:w-6/12">
                    <Image
                      className="rounded-md"
                      alt="alt"
                      src={n.thumnail}
                      height={500}
                      width={900}
                    />
                  </div>
                  <div className="w-12/12 md:w-6/12 text-sm">
                    <span className="font-semibold text-base text-red-600 text-xs">
                      {n.type}
                    </span>
                    <h3 className="font-bold text-xl cursor-pointer hover:text-gray-400">
                      {n.title}
                    </h3>
                    <p className="text-base">{n.description}</p>
                    <p className="text-md">
                      {moment(n.submitday).fromNow()} - {n.author}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="">
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

export default ListNews
