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
                    <Link href="/page" passHref>
                    <p>Trang chủ</p>
                    </Link>
                </Home>
                <ChevronRight></ChevronRight>
            </span>
            <h3 className="cursor-pointer">
                {data.map((page) => {
                    if (router.asPath == page.pid)
                        return <Link href={page.pid} passHref>
                        <p>{page.title}</p>
                        </Link>  
                })}
            </h3>
        </div>
    )
}

export default RouteBar