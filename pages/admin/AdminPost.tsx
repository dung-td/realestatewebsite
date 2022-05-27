import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import Filter from "../../components/User/Filter"
import Item from "../../components/admin/Dashboard/Post/Item"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import server from "../../interfaces/server"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const AdminPost = ({ type }: any) => {
  const [data, setData] = useState<Array<any>>([])
  const [queryData, setQueryData] = useState<Array<any>>([])

  const [pageCount, setPageCount] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState<Array<any>>([])

  const [postTypes, setPostTypes] = useState<Array<any>>([])
  const [postType, setPostType] = useState("")

  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("Tin đã được duyệt")
  const [alertOpen, setAlertOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)

  // Get tab name
  // useEffect(() => {
  //   fetch(`${server}/post-type/get`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let arr = new Array()
  //       data.data.forEach((item: any) => {
  //         let obj = { id: item._id, label: item.name }
  //         arr.push(obj)
  //       })
  //       setPostTypes(arr)
  //     })
  // }, [])

  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setIsLoading(true)
    setTabValue(newValue)
    switch (newValue) {
      case 0:
        setPostType("")
        break
      case 1:
        setPostType("627ba24aea534ab591781729")
        break
      case 2:
        setPostType("627ba1eeea534ab591781728")
        break
      case 3:
        setPostType("627b993cea534ab591781727")
        break
      case 4:
        setPostType("627ba283ea534ab59178172a")
      default:
        break
    }
  }

  const openAlert = () => {
    setAlertOpen(true)
  }

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

  const onSearch = (query: string) => {
    console.log(query)
    let queryArray = new Array<any>()
    data.forEach((post) => {
      if (post.title.toLowerCase().includes(query) || post._id.includes(query)) {
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
    fetch(`${server}/post/get?s=${type}&pt=${postType}`)
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
  }, [tabValue, isChange, type])

  const removeCallback = (id: string, type: string) => {
    setIsLoading(true)
    switch (type) {
      case "approve":
        approve(id)
        break
      case "decline":
        decline(id)
        break
      case "terminate":
        terminate(id)
        break
      case "delete":
        _delete(id)
        break
      case "remove":
        decline(id)
        break
      default:
        break
    }
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
    fetch(`${server}/admin/post/delete`, {
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
    setAlertMessage("Tin đã được xóa")
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

  return (
    <div className="ml-72 p-8 min-h-screen">
      <div className="grid grid-full">
        <div className="mb-4">
          <p className="font-bold text-xl">Tin đang chờ duyệt</p>
          <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
        </div>

        <Filter callback={onSearch} />

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
              {postTypes.map((type: any) => (
                <Tab key={type.id} label={type.label} />
              ))}
              <Tab label={`Tất cả`} />
              <Tab label={`VIP3`} />
              <Tab label={`VIP2`} />
              <Tab label={`VIP1`} />
              <Tab label={`Tin thường`} />
            </Tabs>
          </Box>

          {currentPageData.map((item: any) => {
            return (
              <Item
                postType={postType}
                callback={removeCallback}
                key={item._id}
                data={item}
              />
            )
          })}
        </Box>

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

export default AdminPost
