import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import type { NextPage, GetServerSideProps } from "next"
import Sidebar from "../../components/admin/Dashboard/Sidebar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Box from "@mui/material/Box"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AdminPost from "./AdminPost"
import AdminUser from "./AdminUser"
import AdminTransaction from "./AdminTransactionList"
import Custom404 from "../../pages/404"
import server from "../../interfaces/server"
import AdminWaitingTransaction from "./AdminWaitingTransaction"

const Home = () => {
  const router = useRouter()
  const { s } = router.query
  const { st } = router.query

  const [select, setSelect] = useState(s != undefined ? s : "post")
  const [selectPostType, setSelectPostType] = useState(
    st != undefined ? st : "waiting"
  )

  const [isLogin, setIsLogin] = useState(false)
  const [fullname, setFullname] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin")) {
      setIsLogin(true)
    }
  }, [isLogin])

  // useEffect(() => {
  //   if (isLogin) {
  //     fetch(`${server}/user/currentUser`, {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setFullname(data.user.fullname)
  //       })
  //   }
  // }, [isLogin])

  return (
    <div className="relative">
      {isLogin ? (
        <>
          <Header />

          {/* Sidebar */}
          <div className="absolute w-72 min-h-screen">
            <div className="py-4 px-3 bg-gray-50 rounded">
              <ul className="space-y-2">
                {/* User */}
                <li>
                  <a
                    href="#"
                    className="flex space-x-4 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
                  >
                    <div className="rounded-full bg-black h-10 w-10"></div>
                    <p className="font-medium text-lg">batdongsan88 - Admin</p>
                  </a>
                </li>
                {/* Quản lý tin đăng */}
                <li>
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span className="material-icons">list</span>
                      <span
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                        sidebar-toggle-item="dropdown-1"
                      >
                        Quản lý tin đăng
                      </span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul id="dropdown-1" className="space-y-2">
                        <li>
                          <a
                            onClick={() => {
                              setSelect("post")
                              setSelectPostType("waiting")
                            }}
                            className={`${
                              select == "post" && selectPostType == "waiting"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            } cursor-pointer  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Tin đang chờ duyệt
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setSelect("post")
                              setSelectPostType("approved")
                            }}
                            className={`${
                              select == "post" && selectPostType == "approved"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Tin đã duyệt
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setSelect("post")
                              setSelectPostType("terminated")
                            }}
                            className={`${
                              select == "post" && selectPostType == "terminated"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Tin chờ xử lý
                          </a>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
                {/* Quản lý tài khoản */}
                <li>
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span className="material-icons">person</span>
                      <span
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                        sidebar-toggle-item="dropdown-1"
                      >
                        Quản lý tài khoản
                      </span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul id="dropdown-1" className="space-y-2">
                        <li>
                          <a
                            onClick={() => {
                              setSelect("userList")
                            }}
                            className={`${
                              select == "userList"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Danh sách người dùng
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setSelect("userWrong")
                            }}
                            className={`${
                              select == "userWrong"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Xử lý vi phạm
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setSelect("userStatistic")
                            }}
                            className={`${
                              select == "userStatistic"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Thống kê
                          </a>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
                {/* Quản lý giao dịch */}
                <li>
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span className="material-icons">paid</span>
                      <span
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                        sidebar-toggle-item="dropdown-1"
                      >
                        Quản lý giao dịch
                      </span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul id="dropdown-1" className="space-y-2">
                        <li>
                          <a
                            onClick={() => {
                              setSelect("transactionList")
                            }}
                            className={`${
                              select == "transactionList"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Danh sách giao dịch
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setSelect("transactionWaiting")
                            }}
                            className={`${
                              select == "transactionWaiting"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Giao dịch chờ duyệt
                          </a>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
                {/* Quản lý dự án */}
                <li>
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span className="material-icons">apartment</span>
                      <span
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                        sidebar-toggle-item="dropdown-1"
                      >
                        Quản lý dự án
                      </span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul id="dropdown-1" className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                          >
                            Danh sách dự án
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                          >
                            Dự án chờ phê duyệt
                          </a>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
              </ul>
            </div>
          </div>

          <div className="min-h-screen ">
            {select == "post" ? (
              <AdminPost type={selectPostType} />
            ) : select == "userList" ? (
              <AdminUser />
            ) : select == "transactionList" ? (
              <AdminTransaction />
            ) : (
              <AdminWaitingTransaction />
            )}
          </div>

          <Footer />
        </>
      ) : (
        <Custom404 />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${server}/post/get?s=waiting`)
  let data = await res.json()
  data = data.data

  return { props: { data } }
}

export default Home
