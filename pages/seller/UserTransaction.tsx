import * as React from "react"
import { useState, useEffect, Fragment, MouseEvent, KeyboardEvent } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Pagination from "@mui/material/Pagination"
import server from "../../interfaces/server"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

import Filter from "../../components/User/Filter"
import Item from "../../components/User/Transaction/Item"

import Transaction from "../../interfaces/transaction"

const UserTransaction = () => {
  const [data, setData] = useState<Array<Transaction>>([])
  const [queryData, setQueryData] = useState<Array<Transaction>>([])

  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState<Array<any>>([])

  const [transactionType, setTransactionType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setIsLoading(true)
    switch (newValue) {
      case 0:
      default:
        setTransactionType("")
        break
      case 1:
        setTransactionType("income")
        break
      case 2:
        setTransactionType("outcome")
        break
    }
  }

  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return
  //   }

  //   setAlertOpen(false)
  // }

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const firstPageIndex = (value - 1) * 5
    const lastPageIndex = firstPageIndex + 5
    setCurrentPageData(queryData.slice(firstPageIndex, lastPageIndex))
    window.scroll(0, 0)
  }

  useEffect(() => {
    let isCancelled = false
    let userId = localStorage.getItem("id")
    fetch(`${server}/transaction?user=${userId}&type=${transactionType}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        let count = data.data.length / 5
        setPageCount(
          Math.round(count) < count ? Math.round(count) + 1 : Math.round(count)
        )
        const firstPageIndex = 0
        const lastPageIndex = firstPageIndex + 5
        setCurrentPageData(data.data.slice(firstPageIndex, lastPageIndex))
        setQueryData(data.data)
        setIsLoading(false)
      })
    return () => {
      isCancelled = true
    }
  }, [tabValue])

  return (
    <>
      <div className="ml-72 p-8">
        <div className="grid grid-full">
          <div className="mb-4">
            <p className="font-bold text-xl">LỊCH SỬ GIAO DỊCH</p>
            <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
          </div>

          <Filter />

          <Box sx={{ width: "100%" }}>
            <Box
              className="mb-4"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label={`Tất cả`} />
                <Tab label={`Tiền vào`} />
                <Tab label={`Tiền ra`} />
              </Tabs>
            </Box>
          </Box>

          <div className="space-y-4 mb-4">
            {queryData.reverse().map((transaction) => {
              return (
                <Item
                  callback={null}
                  key={transaction._id}
                  transaction={transaction}
                />
              )
            })}
          </div>

          {data.length > 0 ? (
            <Pagination
              className="center"
              count={pageCount}
              onChange={onPageChange}
              showFirstButton
              showLastButton
            />
          ) : (
            <p className="text-center italic">Không có thông tin</p>
          )}

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            className="flex flex-col"
            // onClick={handleCloseLoading}
          >
            <p>Đang tải...</p>
            <CircularProgress className="mt-4" color="inherit" />
          </Backdrop>
        </div>
      </div>
    </>
  )
}

export default UserTransaction
