import { useState } from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const Sidebar = () => {
  return (
    <>
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
                      <a className="border-r-4 border-[#1976d2] bg-blue-50 flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                        Tin đang chờ duyệt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                      >
                        Tin đã duyệt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
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
                        href="#"
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                      >
                        Danh sách người dùng
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                      >
                        Xử lý vi phạm
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                      >
                        Thống kê
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
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                      >
                        Danh sách dự án
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
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
      </aside>
    </>
  )
}

export default Sidebar
