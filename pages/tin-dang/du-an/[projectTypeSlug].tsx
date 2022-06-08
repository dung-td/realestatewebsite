import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import server from "../../../interfaces/server"
import Footer from "../../../components/Footer"
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Pagination from "@mui/material/Pagination"
import CircularProgress from '@mui/material/CircularProgress'
import Header from "../../../components/Header"
import SearchBarOnList from "../../../components/SearchBarOnList"
import { Search } from "../../../interfaces/search"
import ProjectCard from "../../../components/Estate/ProjectCard"

type Props = {
    projectType: string
}

const ListPost = (props: Props) => {
    const [sort, setSort] = useState('Thông thường')

    const [posts, setPosts] = useState(new Array())
    const [pageCount, setPageCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [currentPageIndex, setCurrentPageIndex] = useState(1)
    const [currentPageData, setCurrentPageData] = useState<Array<any>>([])

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const firstPageIndex = (value - 1) * 8
        const lastPageIndex = firstPageIndex + 8
        setCurrentPageData(posts.slice(firstPageIndex, lastPageIndex))
        setCurrentPageIndex(value)
        window.scroll(0, 0)
    }

    useEffect(() => {
        const fetchData = async () => {
            let arr = new Array()
            let data = undefined
            const res = await fetch(`${server}/project/get?et=${props.projectType}&stt=approved&limit=24`)
            data = await res.json()
            data = data.data

            data.forEach((post: any) => {
                let obj = {
                    _id: post._id,
                    name: post.name,
                    address: post.address,
                    status: post.projectStatus,
                    projectType: post.projectType,
                    thumbnail: post.images[0],
                    price: post.price,
                    area: post.area,
                    apartments: post.aparmentNumber,
                    buildings: post.buildingNumber,
                    investorName: post.investor.name,
                    titleColor: post.postType.title_color,
                    slug: post.slug,
                }
                arr.push(obj)
            })
            setPosts(arr)
            arr.length > 0 ? setIsLoading(false) : null

            let count = arr.length / 8
            setPageCount(
            Math.round(count) < count ? Math.round(count) + 1 : Math.round(count)
            )
            const firstPageIndex = 0
            const lastPageIndex = firstPageIndex + 8
            setCurrentPageData(arr.slice(firstPageIndex, lastPageIndex))
        }

        fetchData()
    }, [])

    return (
        <>
            <Header/>

            {/* List posts */}-
            <div className="bg-white w-full">
                <div className="max-w-full mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:px-8" style={{maxWidth: '1200'}}>
                    <div className="grid">
                        <div className="flex flex-row mb-4 items-center justify-between">
                            <h2 className="font-bold text-base">Trang {currentPageIndex.toString()}</h2>

                            <div className="w-[34%] sm:w-[24%] md:w-[20%] lg:w-[16%]">
                                <FormControl fullWidth>
                                    <Select
                                        value={sort}
                                        style={{height: 38, fontSize: 14}}
                                        className="text-sm"
                                        onChange={(e) => {
                                            setSort(e.target.value)
                                            //handleSortResults(e)
                                        }}
                                    >
                                        <MenuItem key={0} value={'Thông thường'} style={{fontSize: 14}}>Thông thường</MenuItem>
                                        <MenuItem key={0} value={'Mới nhất'} style={{fontSize: 14}}>Mới nhất</MenuItem>
                                        <MenuItem key={0} value={'Cũ nhất'} style={{fontSize: 14}}>Cũ nhất</MenuItem>
                                        <MenuItem key={0} value={'Giá thấp đến cao'} style={{fontSize: 14}}>Giá thấp đến cao</MenuItem>
                                        <MenuItem key={0} value={'Giá cao đến thấp'} style={{fontSize: 14}}>Giá cao đến thấp</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
                    {
                            (currentPageData.length == 0 && !isLoading) ?
                            <p>Không có bất động sản nào thỏa tìm kiếm của bạn</p>
                            :
                            (
                                currentPageData.map((item) => {
                                    return (
                                        <ProjectCard
                                            key={item._id}
                                            id={item._id}
                                            name={item.name}
                                            projectType={item.projectType}
                                            imageUrl={item.thumbnail}
                                            price={item.price}
                                            areaSqr={item.area}
                                            address={item.address}
                                            titleColor={item.titleColor}
                                            slug={item.slug}
                                            statusCode={item.status}
                                            apartments={item.apartments}
                                            buildings={item.buildings}
                                            investor={item.investorName}
                                        />
                                    )
                                })
                            )
                        }
                    </div>

                    {/* Pagination */}
                    {!isLoading ? (
                        <div className="flex justify-center mt-8">
                            <Pagination
                                count={pageCount}
                                onChange={onPageChange}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    ) : (
                        // <p className="text-center text-base italic">Không có thông tin</p>
                        <div className="text-center mt-4 h-[768px]">
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </div>

            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    var projectType = context.params?.projectTypeSlug

    // Get EstateTypeID
    const projectTypes = await fetch(`${server}/a/project-type/get`)
    let data = await projectTypes.json()
    data = data.data

    for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.slug == projectType) {
            projectType = element._id
            break
        }
    }

    return { props: { projectType: projectType } }
}

export default ListPost