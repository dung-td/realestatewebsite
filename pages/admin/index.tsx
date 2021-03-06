import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import type { NextPage, GetServerSideProps } from "next"
import Header from "../../components/Header"
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
import AdminProjectList from "./AdminProjectList"
import AdminWaitingProject from "./AdminWaitingProject"

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
    if (localStorage.getItem("isAdmin")) {
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
                {/* Qu???n l?? tin ????ng */}
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
                        Qu???n l?? tin ????ng
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
                            Tin ??ang ch??? duy???t
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
                            Tin ???? duy???t
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
                            Tin ch??? x??? l??
                          </a>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
                {/* Qu???n l?? t??i kho???n */}
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
                        Qu???n l?? t??i kho???n
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
                            Danh s??ch ng?????i d??ng
                          </a>
                        </li>
                        {/* <li>
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
                            X??? l?? vi ph???m
                          </a>
                        </li> */}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
                {/* Qu???n l?? giao d???ch */}
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
                        Qu???n l?? giao d???ch
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
                            Danh s??ch giao d???ch
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
                            Giao d???ch ch??? duy???t
                          </a>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
                {/* Qu???n l?? d??? ??n */}
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
                        Qu???n l?? d??? ??n
                      </span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul id="dropdown-1" className="space-y-2">
                        <li>
                          <a
                            onClick={() => {
                              setSelect("projectList")
                            }}
                            className={`${
                              select == "projectList"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Danh s??ch d??? ??n
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setSelect("waitingProject")
                            }}
                            className={`${
                              select == "waitingProject"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            D??? ??n ch??? ph?? duy???t
                          </a>
                        </li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </li>
              </ul>
            </div>
          </div>

          <div className=" h-[50rem]">
            {select == "post" ? (
              <AdminPost type={selectPostType} />
            ) : select == "userList" ? (
              <AdminUser />
            ) : select == "transactionList" ? (
              <AdminTransaction />
            ) : select == "projectList" ? (
              <AdminProjectList />
            ) : select == "waitingProject" ? (
              <AdminWaitingProject />
            ) : (
              <AdminWaitingTransaction />
            )}
          </div>

          {/* <Footer /> */}
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
