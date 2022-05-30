import Script from "next/script"
import Head from "next/head"
import { useState } from "react"

import MoneyFormat from "../../../util/MoneyFormat"

type item = {
  value: number
  isDiscount: boolean
  discountPrice: number
}

interface Props {
  callback: any
}

const AccountPurchase = ({callback} : Props) => {
  const items = [
    {
      value: 50000,
      isDiscount: false,
      discountPrice: 50000,
    },
    {
      value: 200000,
      isDiscount: true,
      discountPrice: 180000,
    },
    {
      value: 500000,
      isDiscount: true,
      discountPrice: 450000,
    },
    {
      value: 1000000,
      isDiscount: true,
      discountPrice: 900000,
    },
  ]
  const [selectedItem, setSelectedItem] = useState<item>(items[0])


  const onChangeRatio = (e: any) => {
    for (let i: number = 0; i < items.length; i++) {
      if (items[i].value == e.target.value) {
        setSelectedItem(items[i])
        break
      }
    }
  }


  const Item = (props: item) => {
    const [isDiscount, setIsDiscount] = useState(props.isDiscount)
    const [discountPrice, setDiscountPrice] = useState(props.discountPrice)
    const [price, setPrice] = useState(props.value)

    return (
      <div className="relative max-w-full md:max-w-[48%] w-full text-gray-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 m-1">
        <div className="flex items-center">
          <p className="text-md mr-2">
            {" "}
            {MoneyFormat(props.value)} vnđ bdt88{" "}
          </p>
          {isDiscount == true ? (
            <p className="w-min rounded-md text-white bg-red-700 hover:bg-red-800 text-xs p-0.5">
              -{(price - discountPrice)/1000}k
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
          value={props.value}
          checked={selectedItem?.value == props.value ? true : false}
          className="absolute top-1 right-1 w-4 h-4 border-gray-300"
        />
      </div>
    )
  }

  return (
    <>
      <div className="block p-6 max-w-3xl bg-white rounded-lg border border-gray-200 shadow-md">
        <p className="font-bold text-sm md:text-xl">Nạp tiền</p>

        <div className="mt-4">
          <p>Tài khoản nạp</p>
          <p className="font-bold italic text-md md:text-2xl text-[#DE4839] p-2">
            tngcdng
          </p>
        </div>

        <div className="mt-4">
          <p>Giá trị</p>

          <div className="flex flex-wrap">
            {items.map((item) => {
              return (
                <Item
                  key={item.value}
                  value={item.value}
                  isDiscount={item.isDiscount}
                  discountPrice={item.discountPrice}
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
              {MoneyFormat(selectedItem?.discountPrice)} VNĐ
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={()=> {
            callback("close")
          }} className="text-black bg-white-700 border border-gray-300 hover:bg-gray-100 w-[50%] md:w-[20%] p-1 md:p-2.5 rounded-md mr-2">
            Hủy
          </button>
          <button onClick={() => {
            callback("purchase", selectedItem.discountPrice)
          }} className="text-white bg-red-700 hover:bg-red-500 w-[50%] md:w-[20%] p-1 md:p-2.5 rounded-md">
            Thanh toán
          </button>
        </div>
      </div>
    </>
  )
}

export default AccountPurchase
