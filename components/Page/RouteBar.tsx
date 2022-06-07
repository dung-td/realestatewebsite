import { Home, ChevronRight } from "@mui/icons-material"
import { useRouter } from "next/router"
import Link from "next/link"
import pagedata from '../../data/page.json'

// let pagedata = require('../../data/page.json')

const RouteBar = () => {
    const data = pagedata
    const router = useRouter()

    return (
        <div className="flex">
            <span>
                <Home>
                    <a title="Trang chủ" href="/page"></a>
                </Home>
                <ChevronRight></ChevronRight>
            </span>
            <h3 className="cursor-pointer">
                {data.map((page) => {
                    if (router.asPath == page.pid)
                        return <a title={page.title} href={page.pid}>{page.title}</a>
                })}
            </h3>
        </div>
    )
}

export default RouteBar