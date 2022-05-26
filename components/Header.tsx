import { useState, Fragment, MouseEvent, KeyboardEvent, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import List from "@mui/material/List"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"

import server from "../interfaces/server"
import { EstateType } from "../interfaces/estateType"
import Logo from "../public/img/logo.png"

import Login from "../components/LoginModal"
import Register from "../components/RegisterModal"

const Header = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [state, setState] = useState(false)
  const [typeLinks, setTypeLinks] = useState([])
  const [newsLinks, setNewsLinks] = useState([])


  const [fullname, setFullname] = useState("")

  const [showModalLogin, setShowModalLogin] = useState(false)
  const [showModalRegister, setShowModalRegister] = useState(false)

  const callbackLoginModal = (action: string) => {
    switch (action) {
      case "close":
        setShowModalLogin(false)
        break
      case "register":
        setShowModalLogin(false)
        setShowModalRegister(true)
        break
      default:
        break
    }
  }

  const callbackRegisterModal = (action: string) => {
    switch (action) {
      case "close":
        setShowModalRegister(false)
        break

      default:
        break
    }
  }

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return
      }
      setState(open)
    }

  const logout = () => {
    sessionStorage.clear()
    setIsLogin(false)
    window.location.href = "/"
  }

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setIsLogin(true)
    }
  }, [])

  useEffect(() => {
    fetch(`${server}/a/estate-type/get`)
      .then((res) => res.json())
      .then((data) => {
        setTypeLinks(data.data)
      })
  }, [])

  useEffect(() => {
    fetch(`${server}/news/type`)
      .then((res) => res.json())
      .then((data) => {
        setNewsLinks(data.data)
      })
  }, [])

  useEffect(() => {
    if (isLogin) {
      fetch(`${server}/user/currentUser`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFullname(data.user.fullname)
        })
    }
  }, [isLogin])

  return (
    <>
      {/* Sub header */}
      <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
        Trang Web Bất Động Sản số 1 Việt Nam
      </p>
      {/* Header */}
      <div className="sticky top-0 bg-white z-20">
        <div className=" bg-white w-full mx-auto px-8 ">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              {/* Open Menu button */}
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={toggleDrawer(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
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
                </svg>
              </button>

              <div className="ml-4 flex lg:ml-0">
                <a className="inline-flex items-center" href="\">
                  <div className="mr-2">
                    <Image
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt="logo.png"
                      height={30}
                      width={30}
                    />
                  </div>
                  <Image src={Logo} alt="logo.png" />
                </a>
              </div>

              {/* divigaton links */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  <div className="flex items-center nav-item">
                    <a
                      href="#"
                      className="relative text-sm font-medium text-gray-700 hover:text-gray-800 nav-link"
                    >
                      Nhà đất cho thuê
                    </a>
                    <div className="nav-link-item absolute top-12 w-80 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      {typeLinks.map((typeLink: EstateType) => {
                        return (
                          <a
                            key={typeLink._id}
                            href={typeLink.slug}
                            className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                          >
                            Cho thuê {typeLink.name}
                          </a>
                        )
                      })}
                    </div>{" "}
                  </div>
                  <div className="flex items-center nav-item">
                    <a
                      href="#"
                      className="relative text-sm font-medium text-gray-700 hover:text-gray-800 nav-link"
                    >
                      Nhà đất bán
                    </a>
                    <div className="z-10 nav-link-item absolute top-12 w-80 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      {typeLinks.map((typeLink: EstateType) => {
                        return (
                          <a
                            key={typeLink._id}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                          >
                            Bán {typeLink.name}
                          </a>
                        )
                      })}
                    </div>{" "}
                  </div>
                  <div className="flex items-center nav-item">
                    <a
                      href="#"
                      className="relative text-sm font-medium text-gray-700 hover:text-gray-800 nav-link"
                    >
                      Dự án
                    </a>
                    <div className="nav-link-item absolute top-12 w-80 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      >
                        Căn hộ chung cư
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      >
                        Cao ốc văn phòng
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      >
                        Khu đô thị mới
                      </a>
                    </div>{" "}
                  </div>
                  <div className="flex items-center nav-item">
                    <a
                      href="#"
                      className="relative text-sm font-medium text-gray-700 hover:text-gray-800 nav-link"
                    >
                      Tin tức
                    </a>
                    <div className="nav-link-item absolute top-12 w-80 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                      {newsLinks.map((newsLink: any) => {
                        return (
                          <a
                            key={newsLink._id}
                            href={`/tin-tuc/${newsLink.slug}`}
                            className="block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300"
                          >
                            {newsLink.name}
                          </a>
                        )
                      })}
                    </div>{" "}
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/* Notification */}
                  {isLogin ? (
                    <a href="#">
                      <span className="material-icons rounded-md border-gray-300 p-2 text-gray-700 hover:bg-gray-200">
                        notifications_none
                      </span>
                    </a>
                  ) : null}
                  {/* Saved  */}
                  {isLogin ? (
                    <>
                      <a href="#">
                        <span className="material-icons rounded-md border-gray-300 p-2 text-gray-700 hover:bg-gray-200">
                          favorite_border
                        </span>
                      </a>
                      <Link href="/post/upload-post">
                        <a className="border-2 rounded-md border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                          Đăng tin
                        </a>
                      </Link>
                    </>
                  ) : null}

                  <span
                    className="h-6 w-px bg-gray-200"
                    aria-hidden="true"
                  ></span>

                  {isLogin ? (
                    <div className="nav-user relative">
                      <div className="flex flex-nowrap items-center space-x-2">
                        <div className="rounded-full bg-black h-10 w-10"></div>
                        <p className="font-medium text-md">{fullname}</p>
                        <span className="material-icons">expand_more</span>
                      </div>
                      <div className="nav-user-item absolute  w-60 py-2 bg-white bg-white-100 rounded-md shadow-xl">
                        <Link href="/seller" passHref={true}>
                          <div className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 items-center">
                            <span className="material-icons mr-2">list</span>
                            <p>Quản lý tin đăng</p>
                          </div>
                        </Link>
                        <Link href="/seller?s=editInfo" passHref={true}>
                          <div className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300 items-center">
                            <span className="material-icons mr-2">person</span>
                            <p>Thông tin cá nhân</p>
                          </div>
                        </Link>
                        <Link href="/seller?s=changePassword" passHref={true}>
                          <div className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-300 text-gray-700 hover:bg-gray-300 items-center">
                            <span className="material-icons mr-2">lock</span>
                            <p>Đổi mật khẩu</p>
                          </div>
                        </Link>
                        <div className="border-t border-gray-200 m-2" />
                        <div
                          onClick={() => {
                            logout()
                          }}
                          className="justify-start inline-flex w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 items-center"
                        >
                          <span className="material-icons mr-2">logout</span>
                          <p>Đăng xuất</p>
                        </div>
                      </div>{" "}
                    </div>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          setShowModalLogin(true)
                        }}
                        className="cursor-pointer p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                      >
                        Đăng nhập{" "}
                      </div>

                      <div
                        className="cursor-pointer p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                        onClick={() => {
                          setShowModalRegister(true)
                        }}
                      >
                        Đăng ký
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden header */}
      <Fragment>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          <Box
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className=" relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={toggleDrawer(false)}
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
                    {isLogin ? (
                      <>
                        <button
                          id="tabs-1-tab-1"
                          className="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          aria-controls="tabs-1-panel-1"
                          role="tab"
                          type="button"
                        >
                          Đăng tin
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          id="tabs-1-tab-1"
                          className="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          aria-controls="tabs-1-panel-1"
                          role="tab"
                          type="button"
                        >
                          Đăng nhập
                        </button>

                        <button
                          id="tabs-1-tab-2"
                          className="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          aria-controls="tabs-1-panel-2"
                          role="tab"
                          type="button"
                        >
                          Đăng ký
                        </button>
                      </>
                    )}
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
                      {typeLinks.map((typeLink: EstateType) => {
                        return (
                          <a
                            key={typeLink._id}
                            href={typeLink.slug}
                            className="text-sm p-0.5 text-gray-300 text-gray-700"
                          >
                            Cho thuê {typeLink.name}
                          </a>
                        )
                      })}
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
                      {typeLinks.map((typeLink: EstateType) => {
                        return (
                          <a
                            key={typeLink._id}
                            href={typeLink.slug}
                            className="text-sm p-0.5 text-gray-300 text-gray-700"
                          >
                            Bán {typeLink.name}
                          </a>
                        )
                      })}
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
          </Box>
        </Drawer>
      </Fragment>

      {/* Login */}
      <Login showModal={showModalLogin} callback={callbackLoginModal} />
      <Register
        // provinces={provinces}
        showModal={showModalRegister}
        callback={callbackRegisterModal}
      />
    </>
  )
}

export default Header
