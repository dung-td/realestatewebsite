import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Script from "next/script"

const Header = () => {
  const [openSideBar, setOpenSideBar] = useState(false)

  const open = () => {
    setOpenSideBar(!openSideBar)
  }

  return (
    <div className="bg-white">
      {/* Nav Hidden */}
      {openSideBar ? (
        <div
          className={`${
            openSideBar ? "fadeIn z-40" : "hidden-nav z-10"
          } fixed inset-0 flex `}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          ></div>

          <div className=" relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={open}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-strokeLinecap="round"
                    stroke-strokeLinejoin="round"
                    stroke-strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-2">
              <div className="border-b border-gray-200">
                <div
                  className="-mb-px flex px-4 space-x-8"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  <button
                    id="tabs-1-tab-1"
                    className="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                    aria-controls="tabs-1-panel-1"
                    role="tab"
                    type="button"
                  >
                    Trang quản lý
                  </button>
                </div>
              </div>

              <div
                id="tabs-1-panel-1"
                className="pt-10 pb-8 px-4 space-y-10"
                aria-labelledby="tabs-1-tab-1"
                role="tabpanel"
                tabIndex={0}
              >
                <div>
                  <p
                    id="women-clothing-heading-mobile"
                    className="font-medium text-gray-900"
                  >
                    Nhà đất bán
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="women-clothing-heading-mobile"
                    className="mt-6 flex flex-col space-y-6"
                  >
                    {[
                      ["Bán nhà căn hộ chung cư", "/dashboard"],
                      ["Bán nhà riêng", "/team"],
                      ["Bán nhà biệt thự", "/projects"],
                      ["Bán nhà abc", "/reports"],
                    ].map(([title, url]) => (
                      <li key={url} className="flow-root">
                        <a href="#" className="-m-2 p-2 block text-gray-500">
                          {" "}
                          {title}{" "}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                id="tabs-1-panel-1"
                className="pt-10 pb-8 px-4 space-y-10"
                aria-labelledby="tabs-1-tab-1"
                role="tabpanel"
                tabIndex={0}
              >
                <div>
                  <p
                    id="women-clothing-heading-mobile"
                    className="font-medium text-gray-900"
                  >
                    Nhà đất bán
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="women-clothing-heading-mobile"
                    className="mt-6 flex flex-col space-y-6"
                  >
                    {[
                      ["Bán nhà căn hộ chung cư", "/dashboard"],
                      ["Bán nhà riêng", "/team"],
                      ["Bán nhà biệt thự", "/projects"],
                      ["Bán nhà abc", "/reports"],
                    ].map(([title, url]) => (
                      <li key={url} className="flow-root">
                        <a href="#" className="-m-2 p-2 block text-gray-500">
                          {" "}
                          {title}{" "}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 p-2 block font-medium text-gray-900 inline-flex items-center space-x-4"
                >
                  <div className="rounded-full bg-black h-10 w-10"></div>
                  <p className="font-medium text-md">Tống Đức Dũng</p>
                  <span className="material-icons">expand_more</span>
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4">
              <a href="#" className="-m-2 p-2 flex items-center">
                <img
                  src="https://flagicons.lipis.dev/flags/4x3/vn.svg"
                  alt=""
                  className="w-5 h-auto block flex-shrink-0"
                />
                <span className="ml-3 block text-sm font-medium"> VIE </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {/* Header */}
      <header className="relative bg-white">
        <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Trang Web Bất Động Sản số 1 Việt Nam
        </p>

        <nav aria-label="Top" className="bg-white w-full mx-auto px-8 z-10">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              {/* Open Menu button */}
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={open}
              >
                <span className="sr-only">Open menu</span>
                {/* <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-stokeLinecap="round"
                    stroke-stokeLinejoin="round"
                    stroke-stokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg> */}
              </button>

              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Navigaton links */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <div className="h-full flex space-x-8">
                  <div className="flex items-center nav-item">
                    <a
                      href="#"
                      className="relative text-sm font-medium text-gray-700 hover:text-gray-800 nav-link"
                    >
                      Nhà đất cho thuê
                    </a>
                    <div className="z-50 nav-link-item absolute mt-40 w-80 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Cho thuê nhà riêng
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Cho thuê căn hộ, chung cư
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Cho thuê nhà biệt thự
                      </a>
                    </div>{" "}
                  </div>
                  <div className="flex items-center nav-item">
                    <a
                      href="#"
                      className="relative text-sm font-medium text-gray-700 hover:text-gray-800 nav-link"
                    >
                      Nhà đất bán
                    </a>
                    <div className="nav-link-item absolute mt-40 w-80 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Bán nhà riêng
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Bán căn hộ, chung cư
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Bán nhà biệt thự
                      </a>
                    </div>{" "}
                  </div>
                  <div className="flex items-center nav-item">
                    <a
                      href="#"
                      className="relative text-sm font-medium text-gray-700 hover:text-gray-800 nav-link"
                    >
                      Dự án
                    </a>
                    <div className="nav-link-item absolute mt-40 w-80 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Căn hộ chung cư
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Cao ốc văn phòng
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                      >
                        Khu đô thị mới
                      </a>
                    </div>{" "}
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/* Notification */}
                  <a href="#">
                    <span className="material-icons rounded-md border-gray-300 p-2 text-gray-700 hover:bg-gray-200">
                      notifications_none
                    </span>
                  </a>
                  <span
                    className="h-6 w-px bg-gray-200"
                    aria-hidden="true"
                  ></span>

                  <div className="nav-user relative">
                    <div className="flex flex-nowrap items-center space-x-2">
                      <div className="rounded-full bg-black h-10 w-10"></div>
                      <p className="font-medium text-md">Tống Đức Dũng</p>
                      <span className="material-icons">expand_more</span>
                    </div>
                    <div className="nav-user-item absolute  w-60 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      <a
                        href="#"
                        className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300 items-center"
                      >
                        <span className="material-icons mr-2">list</span>
                        <p>Quản lý tin đăng</p>
                      </a>
                      <a
                        href="#"
                        className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300 items-center"
                      >
                        <span className="material-icons mr-2">person</span>
                        <p>Quản lý tài khoản</p>
                      </a>
                      <a
                        href="#"
                        className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300 items-center"
                      >
                        <span className="material-icons mr-2">apartment</span>
                        <p>Quản lý dự án</p>
                      </a>
                      <div className="border-t border-gray-200 m-2" />
                      <a
                        href="#"
                        className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300 items-center"
                      >
                        <span className="material-icons mr-2">logout</span>
                        <p>Đăng xuất</p>
                      </a>
                    </div>{" "}
                  </div>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="text-gray-700 hover:text-gray-800 flex items-center"
                  >
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/vn.svg"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">
                      {" "}
                      VIE{" "}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header