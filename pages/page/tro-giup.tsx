import Link from "next/link"
import { Home, ChevronRight } from "@mui/icons-material"

const TroGiup = () => {

    return <div className="pl-36 space-y-5 h-screen bg-gray-100">
        <div className="flex">
            <span>
                <Home>
                    <a title="Trang chủ" href="#"></a>
                </Home>
                <ChevronRight></ChevronRight>
            </span>
            <h3 className="cursor-pointer">Trợ giúp</h3>
        </div>
        <div className="flex">
            <div className="flex">
                <div className="space-y-3">
                    <h3 className="p-4">Công ty</h3>
                    <ul className="text-sm font-medium text-gray-500">
                        <li className="mr-2">
                            <Link href={"./tuyen-dung"}>
                                <a id="tab0" className="inline-block p-4 text-gray-600 bg-gray-100 rounded-lg active dark:bg-gray-800 dark:text-blue-500 w-56 cursor-pointer">Tuyển dụng</a>
                            </Link>
                        </li>
                        <li className="mr-2">
                            <Link href={"./quy-che-hoat-dong"}>
                                <a id="tab1" className="inline-block p-4 text-gray-600 bg-gray-100 rounded-lg active dark:bg-gray-800 dark:text-blue-500 w-56 cursor-pointer">Quy chế hoạt động</a>
                            </Link>
                        </li>
                        <li className="mr-2">
                            <Link href={"./ve-meey-land"}>
                                <a id="tab2" className="inline-block p-4 text-gray-600 bg-gray-100 rounded-lg active dark:bg-gray-800 dark:text-blue-500 w-56 cursor-pointer">Về Meey Land</a>
                            </Link>
                        </li>
                        <li className="mr-2">
                            <Link href="./dieu-khoan-va-dieu-kien">
                                <a id="tab3" className="inline-block p-4 text-gray-600 bg-gray-100 rounded-lg active dark:bg-gray-800 dark:text-blue-500 w-56 cursor-pointer">Điều khoản và điều kiện</a>
                            </Link>
                        </li>
                    </ul>
                    <h3 className="p-4 border-l-4 border-indigo-500">Hỗ trợ</h3>
                    <ul className="text-sm font-medium text-gray-500">
                        <li className="mr-2">
                            <Link href={"./quy-dinh-dang-tin"}>
                                <a id="tab4" className="inline-block p-4 text-gray-600 bg-gray-100 rounded-lg active dark:bg-gray-800 dark:text-blue-500 w-56 cursor-pointer">Quy định đăng tin</a>
                            </Link>
                        </li>
                        <li className="mr-2">
                            <Link href={"./lien-he"}>
                                <a id="tab5" className="inline-block p-4 text-gray-600 bg-gray-100 rounded-lg active dark:bg-gray-800 dark:text-blue-500 w-56 cursor-pointer">Liên hệ</a>
                            </Link>
                        </li>
                        <li className="mr-2">
                            <Link href={"./tro-giup"}>
                                <a id="tab6" className="inline-block p-4 text-white bg-indigo-500 rounded-lg active dark:bg-gray-800 dark:text-blue-500 w-56 cursor-pointer">Trợ giúp</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Panel here */}
            <div className="bg-white w-full mr-36">
                <h1>Tuyển dụng</h1>
                <p>Hiện tại chưa có thông tin tuyển dụng</p>
            </div>
        </div>
    </div>
}

export default TroGiup