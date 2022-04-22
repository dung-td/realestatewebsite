import type { NextPage } from "next"
import Filter from "../components/User/Filter"
import Item from "../components/User/Item"
import Tab from "../components/User/Tab"
import AccountItem from "../components/User/Account/AccountItem"
import AccountPurchase from "../components/User/Account/AccountPurchase"

const Home: NextPage = () => {
  return (
    <>
      <AccountPurchase />
    </>
  )
}

export default Home
