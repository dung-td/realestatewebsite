import { NextPage } from "next"
import Script from "next/script"
import Head from "next/head"
import { useState } from "react"
import Item from "./Item"

const Tab: NextPage = () => {
  const titles = [
    { title: "Tất cả", num: 0 },
    { title: "VIP1", num: 0 },
    { title: "VIP2", num: 0 },
    { title: "Tin thường", num: 0 },
  ]

  return (
    <>
      <div className="grid text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-2 ml-0">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active"
            >
              Tất cả (0)
            </a>
          </li>
          {titles.map((title) => {
            return (
              <li key={title.title} className="mr-2">
                <a
                  href="#"
                  className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
                  aria-current="page"
                >
                  {title.title} ({title.num})
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Tab
