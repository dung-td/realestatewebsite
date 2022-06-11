import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import moment from "moment"
import Item from "../../components/admin/Dashboard/Project/Item"
import Pagination from "@mui/material/Pagination"
import server from "../../interfaces/server"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

import Swal from "sweetalert2"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AdminWaitingProject = ({ type }: any) => {
  const [data, setData] = useState<Array<any>>([])
  const [queryData, setQueryData] = useState<Array<any>>([])

  const [pageCount, setPageCount] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState<Array<any>>([])

  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("Tin đã được duyệt")
  const [alertOpen, setAlertOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)

  const [tabValue, setTabValue] = useState(0)

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
    setCurrentPage(value)
    setIsLoading(true)
    window.scroll(0, 0)
  }

  const onSearch = (query: string) => {
    console.log(query)
    let queryArray = new Array<any>()
    data.forEach((post) => {
      if (
        post.title.toLowerCase().includes(query) ||
        post._id.includes(query)
      ) {
        queryArray.push(post)
      }
    })
    console.log(queryArray)

    setQueryData(queryArray)
    let count = queryArray.length / 5
    setPageCount(
      Math.round(count) < count ? Math.round(count) + 1 : Math.round(count)
    )
    setCurrentPageData(queryArray.slice(0, 5))
  }

  useEffect(() => {
    setIsLoading(true)
    let isCancelled = false
    fetch(`${server}/project/get?page=${currentPage}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setCurrentPageData(data.data)
        setQueryData(data.data)
        setIsLoading(false)
      })
    return () => {
      isCancelled = true
    }
  }, [isChange, currentPage])

  useEffect(() => {
    setIsLoading(true)
    let isCancelled = false
    fetch(`${server}/project/count?s=waiting`)
      .then((res) => res.json())
      .then((data) => {
        let count = data
        setPageCount(parseInt(count))
      })
    return () => {
      isCancelled = true
    }
  }, [])

  const removeCallback = (id: string, type: string) => {
    Swal.fire("Đợi đã nào!", "Tính đang đang được cập nhật!!!", "warning")
    // setIsLoading(true)
    // switch (type) {
    //   case "approve":
    //     approve(id)
    //     break
    //   case "decline":
    //     decline(id)
    //     break
    //   case "terminate":
    //     terminate(id)
    //     break
    //   case "delete":
    //     _delete(id)
    //     break
    //   case "remove":
    //     decline(id)
    //     break
    //   case "ban":
    //     ban(id)
    //   default:
    //     break
    // }
  }

  const decline = async (id: string) => {
    let body = { id: id }
    console.log(body)
    await fetch(`${server}/admin/post/decline`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data: any) => {
        setIsChange(!isChange)
      })
    setAlertMessage("Tin đã được xóa duyệt")
    setAlertOpen(true)
    setIsLoading(false)
  }

  const approve = (id: string) => {
    let body = { id: id }
    console.log(body)
    fetch(`${server}/admin/post/approve`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data: any) => {
        setIsChange(!isChange)
      })
    setAlertMessage("Tin đã được duyệt")
    setAlertOpen(true)
    setIsLoading(false)
  }

  const _delete = (id: string) => {
    let body = { id: id }
    console.log(body)
    fetch(`${server}/admin/user/ban`, {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        period: moment(new Date().setDate(new Date().getDate() + 7)).format(
          "DD/MM/YYYY"
        ),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsChange(!isChange)
      })
    setAlertMessage("Người dùng đã bị cấm đăng 7 ngày!")
    setAlertOpen(true)
    setIsLoading(false)
  }

  const terminate = (id: string) => {
    let body = { id: id }
    console.log(body)
    fetch(`${server}/admin/post/terminate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data: any) => {
        setIsChange(!isChange)
      })
    setAlertMessage("Tin đã được gỡ bỏ")
    setAlertOpen(true)
    setIsLoading(false)
  }

  const ban = (id: string) => {
    let body = { id: id }
    console.log(body)
    fetch(`${server}/admin/post/terminate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data: any) => {
        setIsChange(!isChange)
      })
    setAlertMessage("Tin đã được gỡ bỏ")
    setAlertOpen(true)
    setIsLoading(false)
  }

  return (
    <div className="ml-72 p-8 min-h-screen">
      <div className="grid grid-full">
        <div className="mb-4">
          <p className="font-bold text-xl">Dự án chờ duyệt</p>
          <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
        </div>

        {currentPageData.map((item: any) => {
          return <Item callback={removeCallback} key={item._id} data={item} />
        })}

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
  )
}

export default AdminWaitingProject
