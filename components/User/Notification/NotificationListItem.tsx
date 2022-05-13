import Script from "next/script"
import Head from "next/head"
import { useState } from "react"
import Image from "next/image"

import MoneyFormat from "../../../util/MoneyFormat"

const NotificationListItem = () => {
  return (
    <div className="p-4 relative grid grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <div className="order-2 md:order-1 flex items-center">
        <input
          id="checkbox-all"
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="col-span-11 order-3 md:order-2 md:col-span-9 font-bold text-md">
        <a href="#">
          Batdongsang88.com công bố báo cáo thị trường bất động sản tháng
          04/2022
        </a>
      </div>
      <div className="font-medium order-1 col-span-12 md:order-3 md:col-span-2">
        12:34 - 24/04/2022
      </div>
    </div>
  )
}

export default NotificationListItem
