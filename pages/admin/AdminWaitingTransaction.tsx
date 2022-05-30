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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AdminWaitingTransaction = () => {
  const [data, setData] = useState<Array<Transaction>>([])
  const [queryData, setQueryData] = useState<Array<Transaction>>([])

  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState<Array<any>>([])

  const [alertMessage, setAlertMessage] = useState("Giao dịch đã được duyệt")
  const [alertOpen, setAlertOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [isChange, setIsChange] = useState(false)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setAlertOpen(false)
  }

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const firstPageIndex = (value - 1) * 5
    const lastPageIndex = firstPageIndex + 5
    setCurrentPageData(queryData.slice(firstPageIndex, lastPageIndex))
    window.scroll(0, 0)
  }

  const transactionCallback = (action: string, id: string) => {
    setIsLoading(true)
    switch (action) {
      case "confirm":
        finishTransaction(id)
        break
      case "error":
        break
      default:
        break
    }
  }

  const finishTransaction = (id: string) => {
    fetch(`${server}/transaction/finish`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: "success",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsChange(!isChange)
        setIsLoading(false)
        setAlertOpen(true)
      })
  }

  useEffect(() => {
    let isCancelled = false
    fetch(`${server}/transaction?status=waiting`)
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
  }, [isChange])

  return (
    <>
      <div className="ml-72 p-8">
        <div className="grid grid-full">
          <div className="mb-4">
            <p className="font-bold text-xl">GIAO DỊCH NẠP TIỀN CHỜ DUYỆT</p>
            <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
          </div>

          <div className="space-y-4 mb-4">
            {queryData.reverse().map((transaction) => {
              return (
                <Item
                  callback={transactionCallback}
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

          <Snackbar
            open={alertOpen}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>

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

export default AdminWaitingTransaction
