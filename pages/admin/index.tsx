import { useState } from "react"
import Sidebar from "../../components/admin/Dashboard/Sidebar"
import Header from "../../components/admin/Header"
import Footer from "../../components/Footer"
import Filter from "../../components/User/Filter"
import Item from "../../components/admin/Dashboard/Post/Item"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import type { NextPage, GetServerSideProps } from "next"

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

const Home = ({ data }: any) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <div className="">
      <Header />

      <Sidebar />

      <div className="ml-72 p-8 min-h-screen">
        <div className="grid grid-full">
          <div className="mb-4">
            <p className="font-bold text-xl">Tin đang chờ duyệt</p>
            <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
          </div>

          <Filter />

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="VIP(1)" {...a11yProps(0)} />
                <Tab label="VIP2(2)" {...a11yProps(1)} />
                <Tab label="Tin thường (0)" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Item data={data[0]}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Item />
              <Item />
            </TabPanel>
            <TabPanel value={tabValue} index={0}></TabPanel>
          </Box>

          <Pagination
            className="center"
            count={1}
            showFirstButton
            showLastButton
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("Getting publish post from Server...")
  const res = await fetch(`http://localhost:3031/api/post/list-post-by-status?status=publish`)
  let data = await res.json()
  data = data.data
  
  return { props: { data } }
}

export default Home
