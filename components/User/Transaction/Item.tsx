import { NextPage } from "next"
import Script from "next/script"
import Head from "next/head"
import { useState } from "react"
import Image from "next/image"

import MoneyFormat from "../../../util/MoneyFormat"

const Item: NextPage = () => {
  const [expandDetail, setExpandDetail] = useState(false)

  const [accountValue, setAccountValue] = useState(100000)
  const [accountValueChange, setAccountValueChange] = useState(50000)
  const [accountValue2, setAccountValue2] = useState(0)
  const [accountValue2Change, setAccountValue2Change] = useState(0)

  const expand = () => {
    setExpandDetail(!expandDetail)
  }

  return (
    <div className="p-4 grid grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <div className="col-span-12 text-center md:col-span-3 md:text-left">
        <p className="font-bold text-xl text-[#004E7F]">NẠP TIỀN</p>
        <p className="text-lg">Tài khoản chính</p>
      </div>

      <div className="col-span-6 md:col-span-2">
        <p>Trạng thái</p>
        <p className="w-max text-white bg-yellow-400 font-medium rounded-md text-xs p-0.5">
          Chờ duyệt
        </p>
      </div>
      <div className="col-span-6 md:col-span-2">
        <p>Mã giao dịch</p>
        <p className="font-bold">30041975</p>
      </div>
      <div className="col-span-6 md:col-span-2">
        <p>Ngày đăng</p>
        <p className="font-bold">22/02/2022</p>
      </div>
      <div className="col-span-6 md:col-span-2">
        <p>Ngày hết hạn</p>
        <p className="font-bold">22/02/2022</p>
      </div>

      <div className="col-span-12 md:col-span-6 mt-4"></div>
      <div className="text-center col-span-12 md:text-right">
        <button
          onClick={expand}
          className="center text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Mở rộng
          <span className="material-icons">arrow_drop_down</span>
        </button>
      </div>

      {expandDetail ? (
        <>
          <div className="col-span-12 md:col-span-6 mt-4">
            <p className="text-md text-center font-bold md:text-lg">
              TÀI KHOẢN CHÍNH
            </p>
            <div className="grid grid-cols-2 text-center">
              <div>
                <p>Số dư</p>
                <p className="font-bold text-lg">
                  {MoneyFormat(accountValue)} VNĐ
                </p>
              </div>
              <div>
                <p>Biến động</p>
                <p
                  className={`font-bold text-lg ${
                    accountValueChange > 0
                      ? "text-[#5CB85C]"
                      : accountValueChange < 0
                      ? ""
                      : ""
                  } `}
                >
                  {accountValueChange > 0
                    ? "+"
                    : accountValueChange < 0
                    ? "-"
                    : ""}
                  {MoneyFormat(accountValueChange)} VNĐ
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 mt-4">
            <p className="text-md text-center font-bold md:text-lg">
              TÀI KHOẢN KHUYẾN MÃI
            </p>
            <div className="grid grid-cols-2 text-center">
              <div>
                <p>Số dư</p>
                <p className="font-bold text-lg">
                  {MoneyFormat(accountValue2)} VNĐ
                </p>
              </div>
              <div>
                <p>Biến động</p>
                <p
                  className={`font-bold text-lg ${
                    accountValue2Change > 0
                      ? "text-[#5CB85C]"
                      : accountValue2Change < 0
                      ? ""
                      : ""
                  } `}
                >
                  {accountValue2Change > 0
                    ? "+"
                    : accountValue2Change < 0
                    ? "-"
                    : ""}
                  {MoneyFormat(accountValue2Change)} VNĐ
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 px-8">
            <p className="font-medium">
              Loại giao dịch: <span className="font-bold">NẠP TIỀN</span>
            </p>
          </div>
          <div className="col-span-12 px-8">
            <p className="font-medium">
              Diễn giải:{" "}
              <span className="font-bold">
                {accountValueChange > 0
                  ? "cộng "
                  : accountValueChange < 0
                  ? "trừ "
                  : ""}
                {MoneyFormat(accountValueChange)} VNĐ vào tài khoản chính
              </span>
            </p>
          </div>
          <div className="col-span-12 px-8">
            <p className="font-medium">
              Ghi chú:{" "}
              <span className="font-bold">
                khách hàng nạp tiền vào tài khoản chính
              </span>
            </p>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Item
