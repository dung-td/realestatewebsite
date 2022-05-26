import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import UserPost from "./UserPost"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import EditInformation from "../../components/User/Account/EditInformation"
import ChangePassword from "../../components/User/Account/ChangePassword"
import Custom404 from "../../pages/404"

import server from "../../interfaces/server"

const SellerHome = () => {
  const router = useRouter()
  const { s } = router.query
  const { st } = router.query

  const [select, setSelect] = useState(s != undefined ? s : "post")
  const [selectPostType, setSelectPostType] = useState(
    st != undefined ? st : "waiting"
  )
  console.log(select)
  const [isLogin, setIsLogin] = useState(false)
  const [fullname, setFullname] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setIsLogin(true)
    }
  }, [isLogin])

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
    <div>
      {isLogin ? (
        <>
          <Header />
          <aside className="absolute w-72" aria-label="Sidebar">
            <div className="overflow-y-auto h-screen py-4 px-3 bg-gray-50 rounded">
              <ul className="space-y-2">
                {/* User */}
                <li>
                  <a
                    href="#"
                    className="flex space-x-4 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
                  >
                    <div className="rounded-full bg-black h-10 w-10"></div>
                    <p className="font-medium text-lg">{fullname}</p>
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
                              setSelectPostType("handle")
                            }}
                            className={`${
                              select == "post" && selectPostType == "handle"
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
                              setSelect("editInfo")
                            }}
                            className={`${
                              select == "editInfo"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Thông tin cá nhân
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setSelect("changePassword")
                            }}
                            className={`${
                              select == "changePassword"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Mật khẩu
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
                {/* Quản lý dự án */}
              </ul>
            </div>
          </aside>

          <div className="min-h-screen">
            {select == "post" ? <UserPost type={selectPostType} /> : null}
            {select == "editInfo" ? <EditInformation /> : null}
            {select == "changePassword" ? <ChangePassword /> : null}
          </div>

          <Footer />
        </>
      ) : (
        <Custom404 />
      )}
    </div>
  )
}

export default SellerHome
