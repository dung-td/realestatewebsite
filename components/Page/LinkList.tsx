import { borderColor } from "@mui/system"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import pagedata from '../../data/page.json'

const LinkList = () => {
    const data = pagedata
    const router = useRouter()
    const [isActive, setIsActive] = useState(false)

    const isTabActived = (pid: string) => {
        if(router.asPath == pid)
            return true
    }

    const isCongTyActived = () => {
        if(router.asPath!= "/page/quy-dinh-dang-tin" && router.asPath!="/page/lien-he" && router.asPath!="/page/tro-giup")
            return true
        return false
    }

    const handleClick = (pid: string) => {
        if (router.asPath == pid)
            setIsActive(current => !current)
    }

    return (
        <div className="flex">
            <div className="space-y-3 bg-gray-100">
                <h3 className="p-4" style={{
                    borderLeft: isCongTyActived() ? "4px solid #3F51B5" : ""
                }}>Công ty</h3>
                <ul className="text-sm font-medium text-gray-500">
                    {data.map((page) => {
                        if (page.pid != "/page/quy-dinh-dang-tin" && page.pid != "/page/lien-he" && page.pid != "/page/tro-giup")
                            return <li className="mr-2">
                                <Link href={page.pid}>
                                    <a id={page.pid} className="inline-block p-4 rounded-lg active w-56 cursor-pointer" style={{
                                        backgroundColor: isTabActived(page.pid) ? "#3F51B5" : "",
                                        color: isTabActived(page.pid) ? "white" : ""
                                    }}
                                        onClick={() => handleClick(page.pid)}>{page.title}</a>
                                </Link>
                            </li>
                    })}
                </ul>
                <h3 className="p-4" style={{
                    borderLeft: isCongTyActived() ? "" : "4px solid #3F51B5"
                }}>Hỗ trợ</h3>
                <ul className="text-sm font-medium text-gray-500">
                    {data.map((page) => {
                        if (page.pid == "/page/quy-dinh-dang-tin" || page.pid == "/page/lien-he" || page.pid == "/page/tro-giup")
                            return <li className="mr-2">
                                <Link href={page.pid}>
                                    <a className="inline-block p-4 rounded-lg active w-56 cursor-pointer" style={{
                                        backgroundColor: isTabActived(page.pid) ? "#3F51B5" : "",
                                        color: isTabActived(page.pid) ? "white" : ""
                                    }}
                                        onClick={() => handleClick(page.pid)}>{page.title}</a>
                                </Link>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default LinkList