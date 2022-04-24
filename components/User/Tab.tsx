import { NextPage } from "next"
import Script from "next/script"
import Head from "next/head"
import { useState } from "react"
import Item from "./Item"

const Tab: NextPage = () => {


  const title = [
    ["Tất cả", 0],
    ["VIP1", 0],
    ["VIP2", 0],
    ["VIP3", 0],
    ["Tin thường", 0],
  ]
  return (
    <>
      <div className="grid text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-2">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
              aria-current="page"
            >
              Tất cả (0)
            </a>
          </li>

          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              VIP1 (0)
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              VIP2 (0)
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              VIP3 (0)
            </a>
          </li>
          <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
              Tin thường (0)
            </a>
          </li>
        </ul>
      </div>

      <Item />
    </>
  )
}

export default Tab
