import RouteBar from "../../components/Page/RouteBar"
import ContentPanel from "../../components/Page/ContentPanel"
import LinkList from "../../components/Page/LinkList"
import Page from "../../interfaces/page"
import data from "../../data/page.json"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const Page = () => {
  return (
    <>
      <Header />
      <div className="pl-36 space-y-5 h-screen bg-gray-100 h-auto">
        <RouteBar></RouteBar>
        <div className="flex">
          <LinkList></LinkList>
          {/* Panel here */}
          <ContentPanel></ContentPanel>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       '/page/tuyen-dung',
//       '/page/quy-che-hoat-dong',
//       '/page/ve-meeyland',
//       '/page/dieu-khoan-va-dieu-kien',
//       '/page/quy-dinh-dang-tin',
//       '/page/lien-he',
//       '/page/tro-giup'
//     ],
//     fallback: false
//   }
// }

// export async function getStaticProps() {
//   const page = data
//   console.log(page)
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       page,
//     },
//   }
// }

export default Page
