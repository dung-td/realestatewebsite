import type { NextPage, GetServerSideProps } from "next"
import { useState, useEffect } from "react"
import EstateCard from "../../components/Estate/EstateCard"
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Pagination from "@mui/material/Pagination"
import CircularProgress from '@mui/material/CircularProgress'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SearchBarOnList from "../../components/SearchBarOnList"

import { Search } from "../../interfaces/search"
import server from "../../interfaces/server"
import { Estate } from "../../interfaces/estate"

// type Props = {
//     posts: Estate[]
// }

const ListEstate = () => {
    const [sort, setSort] = useState('Thông thường')

    const [posts, setPosts] = useState(new Array())
    const [pageCount, setPageCount] = useState(0)
    const [currentPageIndex, setCurrentPageIndex] = useState(1)
    const [currentPageData, setCurrentPageData] = useState<Array<any>>([])
    const [province, setProvince] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleSortResults = (e: any) => {

    }

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const firstPageIndex = (value - 1) * 8
        const lastPageIndex = firstPageIndex + 8
        setCurrentPageData(posts.slice(firstPageIndex, lastPageIndex))
        setCurrentPageIndex(value)
        window.scroll(0, 0)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${server}/post/get?stt=approved&limit=32`)
            let data = await res.json()
            
            data = data.data
            let arr = new Array()

            data.forEach((post: any) => {
                let obj = {
                    _id: post._id,
                    title: post.title,
                    // address: post.address,
                    address: post.location.StreetName + ", " + post.location.WardName + ", " + post.location.DistrictName + ", " + post.location.CityName,
                    estateType: post.estateType,
                    thumbnail: post.images[0],
                    price: post.price,
                    priceType: post.priceType,
                    area: post.area,
                    bathroom: post.bathroomNumber,
                    bedroom: post.bedroomNumber,
                    ownerName: post.owner.name,
                    ownerPhone: post.owner.phone,
                    titleColor: post.postType.title_color,
                    slug: post.slug,
                    purpose: post.forSaleOrRent,
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

    const onSearchCallback = async (search: Search) => {
        console.log(search)
        setIsLoading(true)
        const res = await fetch(`${server}/post/search`, {
            method: "POST",
            body: JSON.stringify({
              "province": search.province,
              "district": search.district,
              "ward": search.ward,
              "street": search.street,
              "type": search.type,
              "project": search.project,
              "price": {
                "min": parseInt(search.price?.min || '0'),
                "max": parseInt(search.price?.max || '100'),
              },
              "area": {
                "min": parseInt(search.area?.min || '0'),
                "max": parseInt(search.area?.max || '1000'),
              },
              "bedroom": {
                "min": parseInt(search.bedroom?.min || '0'),
                "max": parseInt(search.bedroom?.max || '100'),
              },
              "width": {
                "min": parseInt(search.width?.min || '0'),
                "max": parseInt(search.width?.max || '100'),
              },
              "streetWidth": {
                "min": parseInt(search.streetWidth?.min || '0'),
                "max": parseInt(search.streetWidth?.max || '100'),
              },
              "saleOrRent": "",
              "orientation": search.orientation,
            }), // string or object
            headers: {
              "Content-Type": "application/json",
            },
        })
        let data = await res.json()
        
        data = data.data
        let arr = new Array()

        data.forEach((post: any) => {
            let obj = {
                _id: post._id,
                title: post.title,
                address: post.address,
                estateType: post.estateType,
                thumbnail: post.images[0],
                price: post.price,
                priceType: post.priceType,
                area: post.area,
                bathroom: post.bathroomNumber,
                bedroom: post.bedroomNumber,
                ownerName: post.owner.name,
                ownerPhone: post.owner.phone,
                titleColor: post.postType.title_color,
                slug: post.slug,
                purpose: post.forSaleOrRent,
            }
            arr.push(obj)
        })
        setPosts(arr)

        let count = arr.length / 8
        setPageCount(
        Math.round(count) < count ? Math.round(count) + 1 : Math.round(count)
        )
        const firstPageIndex = 0
        const lastPageIndex = firstPageIndex + 8
        setCurrentPageIndex(1)
        setCurrentPageData(arr.slice(firstPageIndex, lastPageIndex))
        setIsLoading(false)
    }

    return (
        <>
            <Header/>

            <SearchBarOnList callback={onSearchCallback} />

            {/* List posts */}
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
                                            handleSortResults(e)
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
                                        <EstateCard
                                            key={item._id}
                                            id={item._id}
                                            title={item.title}
                                            estateType={item.estateType}
                                            imageUrl={item.thumbnail}
                                            price={item.price}
                                            priceType={item.priceType}
                                            areaSqr={item.area.toString()}
                                            rooms={item.bedroom + ' PN + ' + item.bathroom + ' WC'}
                                            address={item.address}
                                            titleColor={item.titleColor}
                                            slug={item.slug}
                                            purpose={item.purpose}
                                            author={item.ownerName}
                                            author_phone_number={item.ownerPhone}
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

// export const getServerSideProps: GetServerSideProps = async () => {
//     console.log("Getting post list from Server...")
//     const res = await fetch(`${server}/post/get?stt=approved&limit=20`)
//     let data = await res.json()
    
//     data = data.data
//     let posts = new Array()

//     data.forEach((post: any) => {
//         let obj = {
//             _id: post._id,
//             title: post.title,
//             address: post.address,
//             estateType: post.estateType,
//             thumbnail: post.images[0],
//             price: post.price,
//             priceType: post.priceType,
//             area: post.area,
//             bathroom: post.bathroomNumber,
//             bedroom: post.bedroomNumber,
//             ownerName: post.owner.name,
//             ownerPhone: post.owner.phone,
//             titleColor: post.postType.title_color,
//             slug: post.slug,
//             purpose: post.forSaleOrRent,
//         }
//         posts.push(obj)
//     })

//     return { props: { posts } }
// }

export default ListEstate