import * as React from "react"
import { useState, useEffect, Fragment, MouseEvent, KeyboardEvent } from "react"
import Filter from "../../components/User/Filter"
import Item from "../../components/User/Item"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import server from "../../interfaces/server"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const UserPost = ({ type }: any) => {
  const [data, setData] = useState<Array<any>>([])
  const [queryData, setQueryData] = useState<Array<any>>([])

  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState<Array<any>>([])

  const [postTypes, setPostTypes] = useState<Array<any>>([])
  const [postType, setPostType] = useState("627ba24aea534ab591781729")
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("Tin đã được duyệt")
  const [alertOpen, setAlertOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)

  useEffect(() => {
    fetch(`${server}/post-type/get`)
      .then((res) => res.json())
      .then((data) => {
        let arr = new Array()
        data.data.forEach((item: any) => {
          let obj = { id: item._id, label: item.name }
          arr.push(obj)
        })
        setPostTypes(arr)
      })
  }, [])

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
    fetch(
      `${server}/post/get?oid=62640dfaa4b7d5cedcf0166d&s=${type}&pt=${postType}`
    )
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
      case "delete":
        deletePost(id)
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
    setAlertMessage("Tin đã bị từ chối duyệt")
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

  const deletePost = (id: string) => {
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

  const draft = (id: string) => {
    let body = { id: id }
    console.log(body)
    fetch(`${server}/admin/post/draft`, {
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
    setAlertMessage("Tin đã được chuyển vào tin nháp")
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
              <Tab label={`VIP3`} {...a11yProps(0)} />
              <Tab label={`VIP2`} {...a11yProps(1)} />
              <Tab label={`VIP1`} {...a11yProps(2)} />
              <Tab label={`Tin thường`} {...a11yProps(3)} />
            </Tabs>
          </Box>

          {queryData.map((item: any) => {
            return <Item callback={removeCallback} key={item._id} data={item} />
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

export default UserPost
