import { NextPage } from "next"
import Script from "next/script"
import Head from "next/head"
import { useState } from "react"
import Image from "next/image"
import MoneyFormat from "../../../util/MoneyFormat"

const NotificationModel: NextPage = () => {
  
  return (
    <div className="p-4 relative grid grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <div className=" col-span-12">
        <p className="font-bold text-xl">
          {" "}
          Batdongsang88.com công bố báo cáo thị trường bất động sản tháng
          04/2022
        </p>

        <div className="font-medium p-4">
          <p>Admin</p>
          <p>12:34 - 24/04/2022</p>
        </div>

        <div className="p-4">
          Đừng quên rằng trong tháng 4, Batdongsan.com.vn sẽ có một món quà đặc
          biệt dành tặng cho bạn đó chính là cuốn eBook #11 Bí quyết trở thành
          best-seller trong nghề môi giới BĐS. Với cuốn eBook này, bạn sẽ được
          Batdongsan.com.vn mách nước để: - Hiểu được rõ khái niệm
          best-seller trong nghề môi giới - Nắm được những cách thức để trở
          thành best-seller - Hiểu và ứng dụng thành thạo một số bí quyết giúp
          bạn nhanh chóng trở thành best-seller Cuốn eBook này hoàn toàn miễn
          phí nên bạn đừng chần chừ gì nữa mà hãy đăng ký ngay tại đây.
        </div>
      </div>
    </div>
  )
}

export default NotificationModel
