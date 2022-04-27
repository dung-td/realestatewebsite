import { NextPage } from "next"
import Script from "next/script"
import Head from "next/head"

import { useState } from "react"

const Filter: NextPage = () => {
  return (
    <div className="grid grid-cols-12 mt-1 gap-4 ml-0">
      <div className="col-span-4">
        <div className="relative w-full h-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="material-icons">search</span>
          </div>
          <input
            type="text"
            id="table-search"
            className="w-full h-full rounded-lg py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 "
            placeholder="Tìm kiếm theo mã tin hoặc tiêu đề"
          />
        </div>
      </div>

      <div className="col-span-2">
        <button
          id="dropdownTypeSearch"
          data-dropdown-toggle="dropdown"
          className="justify-between w-full inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
          type="button"
        >
          <span className="material-icons mr-2 text-sm sm:text-base md:text-xl">
            calendar_month
          </span>
          <p className="text-xs sm:text-sm md:text-base">22/02/2022</p>
          <span className="material-icons">arrow_drop_down</span>
        </button>
      </div>
      <div className="col-span-2">
        <button
          id="dropdownTypeSearch"
          data-dropdown-toggle="dropdown"
          className="justify-between w-full inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
          type="button"
        >
          <span className="material-icons mr-2 text-sm sm:text-base md:text-xl">
            calendar_month
          </span>
          <p className="text-xs sm:text-sm md:text-base">22/02/2022</p>
          <span className="material-icons">arrow_drop_down</span>
        </button>
      </div>
      <div className="col-span-2">
        <button
          id="dropdownTypeSearch"
          data-dropdown-toggle="dropdown"
          className="justify-between inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
          type="button"
        >
          <span className="material-icons mr-2 text-sm sm:text-base md:text-xl">
            filter_alt
          </span>
          <p className="text-xs sm:text-sm md:text-base">Bộ lọc</p>
        </button>
      </div>
    </div>
  )
}

export default Filter
