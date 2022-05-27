import Script from "next/script"
import Head from "next/head"
import { useState } from "react"
import Item from "../Item"

import MoneyFormat from "../../../util/MoneyFormat"

const AccountItem = () => {
  const [isUsing, setIsUsing] = useState(false)

  const features = [
    "Các tính năng cơ bản",
    "Hẹn giờ đăng tin",
    "Thống kê các bài đăng",
  ]

  return (
    <>
      <div className="text-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
        <p className="font-bold text-2xl text-[#00D84A] mb-8"> CƠ BẢN</p>
        <p>
          {" "}
          Các tính năng cơ bản, đáp ứng nhu cầu của người dùng cá nhân, không sử
          dụng mục đích thương mại
        </p>
        <p className="font-bold text-2xl mt-8 mb-8">
          {" "}
          {MoneyFormat(90000)} VNĐ
        </p>

        {isUsing ? (
          <p className="italic"> (đang sử dụng)</p>
        ) : (
          <div>
            <p>mỗi tháng</p>
            <p className="font-bold italic">(đã bao gồm VAT)</p>
          </div>
        )}

        <div className="mt-8">
          {isUsing ? (
            <button
              type="button"
              className="w-full h-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Mua ngay
            </button>
          ) : null}
          <button
            type="button"
            className="w-full h-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            Tìm hiểu thêm
          </button>
        </div>

        <div className="text-left ml-8 mt-8">
          {features.map((feature) => {
            return (
              <p key={feature} className="inline-flex items-center mt-2">
                <span
                  style={{ color: "#00D84A" }}
                  className="material-icons mr-8"
                >
                  done_all
                </span>
                {feature}
              </p>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AccountItem
