import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import UserPost from "./UserPost"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import EditInformation from "../../components/User/Account/EditInformation"
import ChangePassword from "../../components/User/Account/ChangePassword"
import AccountPurchase from "../../components/User/Account/AccountPurchase"
import ConfirmPurchase from "../../components/User/Account/ConfirmPurchase"
import Custom404 from "../../pages/404"
import UserTransaction from "./UserTransaction"

import server from "../../interfaces/server"
import MoneyFormat from "../../util/MoneyFormat"
import Swal from "sweetalert2"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.transparent",
  p: 4,
}

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
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLogin(true)
    }
  }, [isLogin])

  useEffect(() => {
    if (isLogin) {
      fetch(`${server}/user/currentUser`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFullname(data.user.fullname)
          setBalance(data.user.balance)
        })
    }
  }, [isLogin])

  const modalCallback = (action: string, value?: number) => {
    if (action == "close") {
      setShowModal(false)
    } else {
      if (value) setAmount(value)
      setShowModal(false)
      setShowModal2(true)
    }
  }

  const modal2Callback = (action: string) => {
    if (action == "close") {
      setShowModal2(false)
    } else {
      confirmPurchase()
    }
  }

  const confirmPurchase = () => {
    fetch(`${server}/transaction/add`, {
      method: "POST",
      body: JSON.stringify({
        status: "waiting",
        user: localStorage.getItem("id"),
        amount: amount,
        balance: 0,
        detail: "Nạp tiền vào tài khoản",
        type: "income",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShowModal2(false)
        Swal.fire("Thành công!", "Giao dịch sẽ sớm được xác nhận", "success")
      })
  }

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
                  <div className="border border-gray-300 rounded-md space-y-4 border-2 p-4">
                    <div className="flex space-x-4 items-center text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                      <div className="rounded-full bg-black h-10 w-10"></div>
                      <p className="font-medium text-lg">{fullname}</p>
                    </div>
                    <div className="inline-flex items-center justify-between w-full">
                      <p className="text-base">Số dư: </p>
                      <p className="text-base ">
                        <span className="font-medium">
                          {MoneyFormat(balance)}
                        </span>{" "}
                        vnđ
                      </p>
                    </div>
                    <div className="inline-flex items-center justify-end w-full">
                      <button
                        onClick={() => {
                          setShowModal(true)
                        }}
                        className="border border-red-600 rounded-md px-2 py-0.5"
                      >
                        <p> Nạp tiền</p>
                      </button>
                    </div>
                  </div>
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
                              setSelect("userTransaction")
                            }}
                            className={`${
                              select == "userTransaction"
                                ? `border-r-4 border-[#1976d2] bg-blue-50`
                                : ``
                            }  cursor-pointer flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100`}
                          >
                            Lịch sử giao dịch
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
            {select == "userTransaction" ? <UserTransaction /> : null}
          </div>

          <Modal
            open={showModal}
            onClose={() => {
              setShowModal(false)
            }}
          >
            <Box sx={style}>
              <AccountPurchase callback={modalCallback} />
            </Box>
          </Modal>

          <Modal
            open={showModal2}
            onClose={() => {
              setShowModal2(false)
            }}
          >
            <Box sx={style}>
              <ConfirmPurchase value={amount} callback={modal2Callback} />
            </Box>
          </Modal>

          <Footer />
        </>
      ) : (
        <Custom404 />
      )}
    </div>
  )
}

export default SellerHome
