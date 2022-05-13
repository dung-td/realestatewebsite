import type { NextPage } from "next"
import Filter from "../components/User/Filter"
import Item from "../components/User/Transaction/Item"
import Tab from "../components/User/Tab"
import AccountItem from "../components/User/Account/AccountItem"
import AccountPurchase from "../components/User/Account/AccountPurchase"
import NotificationListItem from "../components/User/Notification/NotificationListItem"
import NotificationModel from "../components/User/Notification/NotificationModel"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <div className="grid-full">
        <div className="relative">
          <div className="home-banner">
            <img src="https://phathung.vn/wp-content/uploads/2019/02/ecogreen-banner.jpg" />
          </div>
          <div className="w-4/5 ml-auto mr-auto md:absolute md:w-full md:top-10">
            <SearchBar />
          </div>
        </div>

        {/* ELEMENTS GO HERE PLEASE */}
      </div>
    </>
  )
}

export default Home
