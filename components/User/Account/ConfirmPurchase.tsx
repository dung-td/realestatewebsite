import { useState } from "react"

import MoneyFormat from "../../../util/MoneyFormat"

interface Props {
  value: number
  callback: any
}

const ConfirmPurchase = ({ value, callback }: Props) => {
  return (
    <>
      <div className="block p-6 max-w-3xl bg-white rounded-lg border border-gray-200 shadow-md">
        <p className="font-bold text-sm md:text-xl">Nạp tiền</p>

        <div className="mt-4">
          <p>Giá trị nạp</p>
          <p className="font-bold italic text-md md:text-2xl text-[#DE4839] p-2">
            {MoneyFormat(value)} vnđ
          </p>
        </div>

        <div className="mt-4">
          <p>Phương thức</p>
          <div className="border border-gray-500 rounded-md p-4 mt-2 space-y-4">
            <p>Tài khoản ngân hàng</p>
            <p className="font-bold">
              Ngân hành TMCP Đầu tư và Phát triển Việt Nam
            </p>
            <p>
              Chủ tài khoản:{" "}
              <span className="font-bold italic">TONG DUC DUNG</span>
            </p>
            <p>
              Số tài khoản:{" "}
              <span className="font-bold italic">31410003626156</span>
            </p>
            <p>
              Số tiền:{" "}
              <span className="font-bold italic">{MoneyFormat(value)} VNĐ</span>
            </p>
            <p>
              Nội dung:{" "}
              <span className="font-bold italic bg-gray-300 p-2 rounded-md">
                batdongsan88 tngcdng {value / 1000}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 italic">
          <p>Lưu ý:</p>
          <p>- Chuyển khoản ghi đúng nội dung ở trên</p>
          <p>- Chỉ nhấn nút xác nhận sau khi đã chuyển khoản</p>
          <p>
            - Thời gian phê duyệt tối đa 3 tiếng kể từ lúc xác nhận, nếu quá
            thời gian trên không nhận được tiền vui lòng liên hệ hotline:{" "}
            <span className="font-bold">0932 69 63 61</span>
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              callback("close")
            }}
            className="text-black bg-white-700 border border-gray-300 hover:bg-gray-100 w-[50%] md:w-[20%] p-1 md:p-2.5 rounded-md mr-2"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              callback("purchase")
            }}
            className="text-white bg-red-700 hover:bg-red-500 w-[50%] md:w-[20%] p-1 md:p-2.5 rounded-md"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </>
  )
}

export default ConfirmPurchase
