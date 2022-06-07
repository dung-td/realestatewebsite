import { useRouter } from "next/router"
import pagedata from '../../data/page.json'

const ContentPanel = () => {
    const data = pagedata
    const router = useRouter()

    return (
        <div className="bg-white w-full mr-36">
            {data.map((page) => {
                if (router.asPath == page.pid)
                    return (<div className="p-10 space-y-8"><h1 className="text-3xl  font-bold">{page.title}</h1>
                        <p className="text-lg">{page.comment}</p></div>)
            })}
        </div>
    )
}

export default ContentPanel