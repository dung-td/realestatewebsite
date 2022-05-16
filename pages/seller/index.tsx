import { useState } from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import UserPost from "./UserPost"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Filter from "../../components/User/Filter"
import Item from "../../components/User/Item"
import Sidebar from "../../components/User/Sidebar"
import Tab from "../../components/User/Tab"

const Home = () => {
  const [select, setSelect] = useState("post")
  const [selectPostType, setSelectPostType] = useState("waiting")

  return (
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
              <Accordion>
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
            {/* Quản lý dự án */}
          </ul>
        </div>
      </aside>

      <div className="min-h-screen">
        {select == "post" ? <UserPost type={selectPostType} /> : null}
      </div>

      <Footer />
    </>
  )
}

export default Home
