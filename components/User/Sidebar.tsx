import type { NextPage } from "next"
import { useState } from "react"

const Sidebar: NextPage = () => {
  return (
    <>
      <aside className="w-72 " aria-label="Sidebar">
        <div className="overflow-y-auto h-screen py-4 px-3 bg-gray-50 rounded">
          <ul className="space-y-2">
            {/* User */}
            <li>
              <a
                href="#"
                className="flex space-x-4 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
              >
                <div className="rounded-full bg-black h-10 w-10"></div>
                <p className="font-medium text-lg">Tống Đức Dũng</p>
              </a>
            </li>
            {/* Quản lý tin đăng */}
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="material-icons">list</span>
                <span
                  className="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item="dropdown-1"
                >
                  Quản lý tin đăng
                </span>
                <span className="material-icons">expand_more</span>
              </button>
              <ul id="dropdown-1" className="py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Đăng tin mới
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Tin đã đăng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Tin nháp
                  </a>
                </li>
              </ul>
            </li>
            {/* Quản lý tài khoản */}
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="material-icons">person</span>
                <span
                  className="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item="dropdown-1"
                >
                  Quản lý tài khoản
                </span>
                <span className="material-icons">expand_more</span>
              </button>
              <ul id="dropdown-1" className="py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Thông tin tài khoản
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Bảo mật tài khoản
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    abcxyz
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="material-icons">person</span>
                <span
                  className="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item="dropdown-1"
                >
                  Quản lý tài khoản
                </span>
                <span className="material-icons">expand_more</span>
              </button>
              <ul id="dropdown-1" className="py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Thông tin tài khoản
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Bảo mật tài khoản
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    abcxyz
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
