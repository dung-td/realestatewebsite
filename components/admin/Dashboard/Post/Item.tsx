import Script from "next/script"
import Head from "next/head"

import { useState, useEffect } from "react"
import Image from "next/image"
import Chip from "@mui/material/Chip"
import server from "../../../../interfaces/server"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"

const Item: React.FC<{ data: any; callback: any }> = ({ data, callback }) => {
  const [expandDetail, setExpandDetail] = useState(false)

  const expand = () => {
    setExpandDetail(!expandDetail)
  }

  return (
    <div className="mb-4 p-4 grid grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <div className="col-span-12 md:col-span-3 lg:col-span-3">
        <Image
          alt={data.title}
          className="rounded-lg"
          src={data.images[0]}
          width={600}
          height={400}
        />
      </div>
      <div className="col-span-12 md:col-span-9">
        <a href="#" className="text-xl font-bold text-gray-700">
          {data.title}
        </a>
        <p className="text-gray-700">
          <span className="font-semibold">{data.estateType}</span> -{" "}
          {data.address}
        </p>
        <div className="grid grid-cols-4 gap-4 mt-6 w-full">
          <div className="col-span-2">
            <p>Trạng thái</p>
            {data.status == "approved" ? (
              <Chip label="Đã duyệt" color="success" />
            ) : data.status == "waiting" ? (
              <Chip label="Chờ duyệt" color="warning" />
            ) : (
              <Chip label="Chờ xử lý" color="error" />
            )}
          </div>
          <div className="col-span-2">
            <p>Mã tin</p>
            <p className="font-bold">{data._id}</p>
          </div>
          <div className="col-span-2">
            <p>Ngày đăng</p>
            <p className="font-bold">{data.publishedDate}</p>
          </div>
          <div className="col-span-2">
            <p>Ngày hết hạn</p>
            <p className="font-bold">{data.expiredDate}</p>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 mt-4">
        {data.status == "waiting" ? (
          <>
            <p>Hạn duyệt bài</p>
            <p className="font-bold">20/02/2022</p>
          </>
        ) : null}
      </div>
      <div className="w-full col-span-12 md:col-span-6 mt-4 grid grid-cols-4 gap-1">
        {data.status == "approved" ? (
          <>
            <div className="col-span-4 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chi tiết
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Xem tin
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Xem tin
              </button>
            </div>
          </>
        ) : data.status == "waiting" ? (
          <>
            <div className="col-span-4 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chi tiết
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-white bg-green-700 hover:bg-green-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  callback(data._id, "approve")
                }}
              >
                Duyệt tin
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-white bg-red-700 hover:bg-red-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  callback(data._id, "decline")
                }}
              >
                Từ chối
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-4 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chi tiết
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-white bg-red-700 hover:bg-red-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Xóa tin
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-white bg-red-700 hover:bg-red-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Cấm đăng
              </button>
            </div>
          </>
        )}

        <div className="col-span-4 md:col-span-1">
          <button
            onClick={expand}
            className="center text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Mở rộng
            <span className="material-icons">arrow_drop_down</span>
          </button>
        </div>
      </div>

      {expandDetail ? (
        data.status == "approved" ? (
          <>
            <p className="col-span-12 text-center font-bold text-md">
              THỐNG KÊ
            </p>
            <div className="col-span-6 font-medium">
              Lượt tiếp cận: <span className="font-bold">3004</span> lượt
            </div>
            <div className="col-span-6 font-medium">
              Lượt xem: <span className="font-bold">1975</span> lượt
            </div>
            <div className="col-span-6 font-medium">
              Lượt thao tác: <span className="font-bold">304</span> lượt
            </div>
            <div className="col-span-6 font-medium">
              Lượt thao tác: <span className="font-bold">304</span> lượt
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
              >
                <p className="text-center">Chi tiết thống kê</p>
              </button>
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
              >
                <p className="text-center">Đẩy bài viết</p>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="col-span-12 text-center font-bold text-md">
              THÔNG TIN NGƯỜI ĐĂNG
            </p>
            <div className="col-span-6 font-medium">
              Người đăng: <span className="font-bold">{data.owner.name}</span>
            </div>
            <div className="col-span-6 font-medium">
              Loại tài khoản: <span className="font-bold">VIP1</span>
            </div>
            <div className="col-span-6 font-medium">
              Số bài đã đăng: <span className="font-bold">304</span> bài
            </div>
            <div className="col-span-6 font-medium">
              Loại tin đăng: <span className="font-bold">{data.postType.name}</span>
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <p className="text-center">Thông tin người dùng</p>
              </button>
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <p className="text-center">Đẩy bài viết</p>
              </button>
            </div>
          </>
        )
      ) : null}
    </div>
  )
}

export default Item
