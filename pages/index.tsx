import type { NextPage } from "next"
import Filter from "../components/User/Filter"
import Item from "../components/User/Transaction/Item"
import Tab from "../components/User/Tab"
import AccountItem from "../components/User/Account/AccountItem"
import AccountPurchase from "../components/User/Account/AccountPurchase"
import NotificationListItem from "../components/User/Notification/NotificationListItem"
import NotificationModel from "../components/User/Notification/NotificationModel"

const Home: NextPage = () => {
  return (
    <>
      <NotificationModel />
    </>
  )
}

export default Home
