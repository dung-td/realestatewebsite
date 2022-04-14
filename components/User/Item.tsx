import { NextPage } from "next"
import Script from "next/script"
import Head from "next/head"

import { useState } from "react"
import Image from "next/image"

const Item: NextPage = () => {
  const [expandDetail, setExpandDetail] = useState(false)
  const [isPublised, setIsPublish] = useState(false)

  const expand = () => {
    setExpandDetail(!expandDetail)
  }

  return (
    <div className="p-4 grid grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <img
        className="rounded-lg col-span-3"
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        width={250}
        height={400}
      />
      <div className="col-span-9">
        <a href="#" className="text-xl font-bold text-gray-700">
          Bán nhà riêng 5m mặt tiền, tổng diện tích 100m2
        </a>
        <p className="font-normal text-gray-700">
          Bán nhà riêng - Thuận An, Bình Dương
        </p>
        <div className="grid grid-cols-4 mt-6">
          <div>
            <p>Trạng thái</p>
            <p className="w-max text-white bg-yellow-400 font-medium rounded-md text-xs p-0.5">
              Chờ duyệt
            </p>
          </div>
          <div>
            <p>Mã tin</p>
            <p className="font-bold">30041975</p>
          </div>
          <div>
            <p>Ngày đăng</p>
            <p className="font-bold">22/02/2022</p>
          </div>
          <div>
            <p>Ngày hết hạn</p>
            <p className="font-bold">22/02/2022</p>
          </div>
        </div>
      </div>
      <div className="col-span-6 mt-4">
        {isPublised ? null : (
          <>
            <p>Hạn duyệt bài</p>
            <p className="font-bold">20/02/2022</p>
          </>
        )}
      </div>
      <div className="col-span-6 mt-4">
        {isPublised ? (
          <>
            <button
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
            >
              Chi tiết
            </button>
            <button
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
            >
              Sửa tin
            </button>
            <button
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
            >
              Thao tác
              <span className="material-icons">arrow_drop_down</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
            >
              Chi tiết
            </button>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
            >
              Duyệt tin
            </button>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
            >
              Từ chối
            </button>
          </>
        )}
        <button
          onClick={expand}
          className="text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
        >
          Mở rộng
          <span className="material-icons">arrow_drop_down</span>
        </button>
      </div>

      {expandDetail ? (
        isPublised ? (
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
            <div className="col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
              >
                <p className="text-center">Chi tiết thống kê</p>
              </button>
            </div>
            <div className="col-span-6 font-medium">
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
              Người đăng: <span className="font-bold">Tống Đức Dũng</span>
            </div>
            <div className="col-span-6 font-medium">
              Loại tài khoản: <span className="font-bold">VIP1</span>
            </div>
            <div className="col-span-6 font-medium">
              Số bài đã đăng: <span className="font-bold">304</span> bài
            </div>
            <div className="col-span-6 font-medium">
              Loại tin đăng: <span className="font-bold">Nổi bật</span>
            </div>
            <div className="col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
              >
                <p className="text-center">Thông tin người dùng</p>
              </button>
            </div>
            <div className="col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
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
