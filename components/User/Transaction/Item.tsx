import { useState, useEffect } from "react"
import Image from "next/image"
import moment from "moment"
import "moment/locale/vi"

import Transaction from "../../../interfaces/transaction"
import MoneyFormat from "../../../util/MoneyFormat"
import server from "../../../interfaces/server"

type Props = {
  transaction: Transaction
  callback: any
}

const Item = ({ transaction, callback }: Props) => {
  moment.locale("vi")
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"))
  const [expandDetail, setExpandDetail] = useState(false)

  const confirmTransaction = () => {}

  const expand = () => {
    setExpandDetail(!expandDetail)
  }

  return (
    <div className="p-4 grid grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <div className="col-span-12 text-center md:col-span-3 md:text-left">
        <p className="font-bold text-xl text-[#004E7F]">
          {transaction.type == "income" ? "TIỀN VÀO" : "TIỀN RA"}
        </p>
        <p className="text-lg">Tài khoản chính</p>
      </div>
      <div className="col-span-6 md:col-span-4">
        <p>Mã giao dịch</p>
        <p className="font-bold">{transaction._id}</p>
      </div>
      <div className="col-span-6 md:col-span-2">
        <p>Trạng thái</p>
        {transaction.status == "waiting" ? (
          <p className="p-1 w-max text-white bg-yellow-400 font-medium rounded-md text-xs p-0.5">
            Chờ duyệt
          </p>
        ) : transaction.status == "success" ? (
          <p className="p-1 w-max text-white bg-green-400 font-medium rounded-md text-xs p-0.5">
            Thành công
          </p>
        ) : (
          <p className="p-1 w-max text-white bg-red-400 font-medium rounded-md text-xs p-0.5">
            Thất bại
          </p>
        )}
      </div>
      <div className="col-span-3 px-8">
        <p>Thời gian</p>
        <p className="font-bold">
          {moment(transaction.dateProceed).format("DD/MM/YYYY, h:m")}
        </p>
      </div>

      <div className="md:col-span-3"></div>

      <div className="col-span-6 md:col-span-4">
        <p>Số dư</p>
        {transaction.status == "success" ? (
          <p className="font-bold text-lg">
            {MoneyFormat(transaction.balance)} VNĐ
          </p>
        ) : (
          <p className="font-bold italic">Chờ xử lý...</p>
        )}
      </div>
      <div className="col-span-6 md:col-span-2">
        <p>Biến động</p>
        {transaction.status != "failed" ? (
          <p className={`font-bold text-lg text-[#5CB85C]`}>
            {transaction.type == "income"
              ? "+"
              : transaction.type == "outcome"
              ? "-"
              : ""}
            {MoneyFormat(transaction.amount)} VNĐ
          </p>
        ) : (
          <p className={`font-bold text-lg text-red-500 `}>0 VNĐ</p>
        )}
      </div>
      <div className="col-span-3 px-8">
        <p>Hoàn tất</p>
        {transaction.status == "success" ? (
          <p className="font-bold">
            {moment(transaction.dateFinish).format("DD/MM/YYYY, h:m")}
          </p>
        ) : (
          <p className="font-bold italic">Chờ xử lý...</p>
        )}
      </div>

      <div className="col-span-12 md:col-span-0 mt-4"></div>
      <div className="col-span-8 px-8">
        <p className="font-medium">
          Diễn giải: <span className="font-bold">{transaction.detail}</span>
        </p>
        {transaction.type == "income" ? (
          <p className="font-medium">
            Nội dung chuyển khoản:{" "}
            <span className="font-bold bg-gray-300 px-2 py-1 rounded-md">
              {`batdongsan88 ${transaction.user} ${transaction.amount}`}
            </span>
          </p>
        ) : null}
      </div>
      {isAdmin ? (
        <>
          <div className="col-span-2">
            <button
              type="button"
              className="w-full text-white bg-red-500 hover:bg-red-700 border border-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                callback("error", transaction._id)
              }}
            >
              Báo lỗi
            </button>
          </div>
          <div className="col-span-2">
            <button
              type="button"
              onClick={() => {
                callback("confirm", transaction._id)
              }}
              className="w-full text-white bg-green-500 hover:bg-green-700 border border-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Xác nhận
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Item
