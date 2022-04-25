import { NextComponentType, NextPage } from "next"
import Script from "next/script"
import Head from "next/head"
import { useState } from "react"

import MoneyFormat from "../../../util/MoneyFormat"

type item = {
  period: number
  isDiscount: boolean
  discountValue: number
  discountPrice: number
  price: number
}

const AccountPurchase: NextPage = () => {
  const items = [
    {
      period: 1,
      isDiscount: false,
      discountValue: 5,
      discountPrice: 40000,
      price: 90000,
    },
    {
      period: 3,
      isDiscount: true,
      discountValue: 10,
      discountPrice: 40000,
      price: 180000,
    },
    {
      period: 6,
      isDiscount: true,
      discountValue: 15,
      discountPrice: 40000,
      price: 280000,
    },
    {
      period: 12,
      isDiscount: true,
      discountValue: 20,
      discountPrice: 40000,
      price: 380000,
    },
  ]

  const onChangeRatio = (e: any) => {
    console.log(e.target.value)
    for (let i: number = 0; i < items.length; i++) {
      if (items[i].period == e.target.value) {
        setSelectedItem(items[i])
        break
      }
    }
  }

  const [selectedItem, setSelectedItem] = useState<item>(items[0])

  const Item = (props: item) => {
    const [isDiscount, setIsDiscount] = useState(props.isDiscount)
    const [discountValue, setDiscountValue] = useState(props.discountValue)
    const [discountPrice, setDiscountPrice] = useState(props.discountPrice)
    const [price, setPrice] = useState(props.price)

    return (
      <div className="relative max-w-full md:max-w-[48%] w-full text-gray-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 m-1">
        <div className="flex items-center">
          <p className="text-md mr-2"> {props.period} tháng </p>
          {isDiscount == true ? (
            <p className="w-min rounded-md text-white bg-red-700 hover:bg-red-800 text-xs p-0.5">
              -{discountValue}%
            </p>
          ) : null}
        </div>

        <div className="flex items-center">
          {isDiscount == true ? (
            <p className="font-bold text-sm md:text-md h-full mr-2">
              {" "}
              <del>{MoneyFormat(price)} VNĐ</del>
            </p>
          ) : null}
          <p className="font-bold text-md md:text-xl h-full">
            {" "}
            {MoneyFormat(discountPrice)} VNĐ
          </p>
        </div>

        <input
          onChange={(e) => {
            onChangeRatio(e)
          }}
          id="option1"
          type="radio"
          name="selected"
          value={props.period}
          checked={selectedItem?.period == props.period ? true : false}
          className="absolute top-1 right-1 w-4 h-4 border-gray-300"
        />
      </div>
    )
  }

  return (
    <>
      <div className="block p-6 max-w-3xl bg-white rounded-lg border border-gray-200 shadow-md">
        <p className="font-bold text-sm md:text-xl">Đăng ký tài khoản</p>

        <div className="mt-4">
          <p>Gói đang chọn</p>
          <p className="font-bold text-md md:text-2xl text-[#DE4839] p-2">
            CHUYÊN NGHIỆP
          </p>
        </div>

        <div className="mt-4">
          <p>Thời lượng</p>

          <div className="flex flex-wrap">
            {items.map((item) => {
              return (
                <Item
                  key={item.price}
                  period={item.period}
                  isDiscount={item.isDiscount}
                  discountPrice={item.discountPrice}
                  discountValue={item.discountValue}
                  price={item.price}
                />
              )
            })}
          </div>
        </div>

        <div className="mt-4">
          <p>Thanh toán</p>
          <div className="flex justify-between">
            <p className="text-xl p-2">Thành tiền</p>
            <p className="font-bold text-xl p-2">
              {" "}
              {MoneyFormat(selectedItem?.price)} VNĐ
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="text-black bg-white-700 border border-gray-300 hover:bg-gray-100 w-[50%] md:w-[20%] p-1 md:p-2.5 rounded-md mr-2">
            Hủy
          </button>
          <button className="text-white bg-red-700 hover:bg-red-500 w-[50%] md:w-[20%] p-1 md:p-2.5 rounded-md">
            Thanh toán
          </button>
        </div>
      </div>
    </>
  )
}

export default AccountPurchase
