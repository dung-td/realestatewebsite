import type { NextPage, GetServerSideProps } from "next"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
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
//     homeSearch: Search
// }

const ListEstate = () => {
    const router = useRouter()
    const [hasQuery, setHasQuery] = useState(router.query ? true : false)
    const [sort, setSort] = useState('Thông thường')

    const [posts, setPosts] = useState(new Array())
    const [pageCount, setPageCount] = useState(0)
    const [currentPageIndex, setCurrentPageIndex] = useState(1)
    const [currentPageData, setCurrentPageData] = useState<Array<any>>([])
    const [province, setProvince] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentSearch, setCurrentSearch] = useState<Search>({
        keyword: "",
        province: "",
        district: "",
        ward: "",
        street: "",
        project: "",
        price: {
            min: "0",
            max: "80000000000",
        },
        area: {
            min: "0",
            max: "1000000",
        },
        type: "",
        bedroom: {
            min: "0",
            max: "100",
        },
        width: {
            min: "0",
            max: "200",
        },
        saleOrRent: "",
        streetWidth: {
            min: "0",
            max: "200",
        },
        orientation: "",
        projectStatus: "",
    })

    const handleSortResults = (e: any) => {

    }

    const onPageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true)
        setCurrentPageData(new Array())
        window.scroll(0, 0)

        const res = await fetch(`${server}/post/search`, {
            method: "POST",
            body: JSON.stringify({
                "province": currentSearch.province,
                "district": currentSearch.district,
                "ward": currentSearch.ward,
                "street": currentSearch.street,
                "type": currentSearch.type,
                "project": currentSearch.project,
                "price": {
                    "min": parseInt(currentSearch.price?.min || '0'),
                    "max": parseInt(currentSearch.price?.max || '100000000000000'),
                },
                "area": {
                    "min": parseInt(currentSearch.area?.min || '0'),
                    "max": parseInt(currentSearch.area?.max || '1000000'),
                },
                "bedroom": {
                    "min": parseInt(currentSearch.bedroom?.min || '0'),
                    "max": parseInt(currentSearch.bedroom?.max || '200'),
                },
                "width": {
                    "min": parseInt(currentSearch.width?.min || '0'),
                    "max": parseInt(currentSearch.width?.max || '1000'),
                },
                "streetWidth": {
                    "min": parseInt(currentSearch.streetWidth?.min || '0'),
                    "max": parseInt(currentSearch.streetWidth?.max || '1000'),
                },
                "saleOrRent": "",
                "orientation": currentSearch.orientation,
                "page": value
            }), // string or object
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await res.json()
        data = data.data.data

        let arr = new Array()
        console.log("DATA: " + data)

        data.forEach((post: any) => {
            let obj = {
                _id: post._id,
                title: post.title,
                // address: post.address,
                address: post.location.DistrictPrefix + " " + post.location.DistrictName + ", " + post.location.CityName,
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
        setIsLoading(false)

        setCurrentPageData(arr)
        setCurrentPageIndex(value)
    }

    useEffect(() => {
        const receiveHomeQuery = () => {
            if (router.query) {
                setCurrentSearch({
                    keyword: router.query.keyword?.toString() || "",
                    province: router.query.province?.toString() || "",
                    district: router.query.district?.toString() || "",
                    ward: router.query.ward?.toString() || "",
                    street: router.query.street?.toString() || "",
                    project: router.query.project?.toString() || "",
                    price: {
                        min: router.query.priceMin?.toString() || "",
                        max: router.query.priceMax?.toString() || "",
                    },
                    area: {
                        min: router.query.areaMin?.toString() || "",
                        max: router.query.areaMax?.toString() || "",
                    },
                    type: router.query.type?.toString() || "",
                    bedroom: {
                        min: router.query.bedroomMin?.toString() || "",
                        max: router.query.bedroomMax?.toString() || "",
                    },
                    width: {
                        min: router.query.widthMin?.toString() || "",
                        max: router.query.widthMax?.toString() || "",
                    },
                    saleOrRent: router.query.saleOrRent?.toString() || "",
                    streetWidth: {
                        min: router.query.streetWidthMin?.toString() || "",
                        max: router.query.streetWidthMax?.toString() || "",
                    },
                    orientation: router.query.orientation?.toString() || "",
                    projectStatus: router.query.projectStatus?.toString() || "",
                })
                setHasQuery(false)
                // let ob = new <Search>({
                //     keyword: router.query.keyword?.toString() || "",
                //     province: router.query.province?.toString() || "",
                //     district: router.query.district?.toString() || "",
                //     ward: router.query.ward?.toString() || "",
                //     street: router.query.street?.toString() || "",
                //     project: router.query.project?.toString() || "",
                //     price: {
                //         min: router.query.priceMin?.toString() || "",
                //         max: router.query.priceMax?.toString() || "",
                //     },
                //     area: {
                //         min: router.query.areaMin?.toString() || "",
                //         max: router.query.areaMax?.toString() || "",
                //     },
                //     type: router.query.type?.toString() || "",
                //     bedroom: {
                //         min: router.query.bedroomMin?.toString() || "",
                //         max: router.query.bedroomMax?.toString() || "",
                //     },
                //     width: {
                //         min: router.query.widthMin?.toString() || "",
                //         max: router.query.widthMax?.toString() || "",
                //     },
                //     saleOrRent: router.query.saleOrRent?.toString() || "",
                //     streetWidth: {
                //         min: router.query.streetWidthMin?.toString() || "",
                //         max: router.query.streetWidthMax?.toString() || "",
                //     },
                //     orientation: router.query.orientation?.toString() || "",
                //     projectStatus: router.query.projectStatus?.toString() || "",
                // })
            }
        }

        receiveHomeQuery()
        // fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            // const res = await fetch(`${server}/post/get?stt=approved&limit=32`)
            const res = await fetch(`${server}/post/search`, {
                method: "POST",
                body: JSON.stringify({
                    "province":  currentSearch.province,
                    "district": currentSearch.district,
                    "ward": currentSearch.ward,
                    "street": currentSearch.street,
                    "type": currentSearch.type,
                    "project": currentSearch.project,
                    "price": {
                        "min": parseInt(currentSearch.price?.min || '0'),
                        "max": parseInt(currentSearch.price?.max || '100000000000'),
                    },
                    "area": {
                        "min": parseInt(currentSearch.area?.min || '0'),
                        "max": parseInt(currentSearch.area?.max || '1000000'),
                    },
                    "bedroom": {
                        "min": parseInt(currentSearch.bedroom?.min || '0'),
                        "max": parseInt(currentSearch.bedroom?.max || '100'),
                    },
                    "width": {
                        "min": parseInt(currentSearch.width?.min || '0'),
                        "max": parseInt(currentSearch.width?.max || '100'),
                    },
                    "streetWidth": {
                        "min": parseInt(currentSearch.streetWidth?.min || '0'),
                        "max": parseInt(currentSearch.streetWidth?.max || '100'),
                    },
                    "saleOrRent": "",
                    "orientation": currentSearch.orientation,
                    "page": 1
                }), // string or object
                headers: {
                "Content-Type": "application/json",
                },
            })

            let data = await res.json()
            let total = data.data.count
            
            data = data.data.data
            let arr = new Array()

            data.forEach((post: any) => {
                let obj = {
                    _id: post._id,
                    title: post.title,
                    // address: post.address,
                    address: post.location.DistrictPrefix + " " + post.location.DistrictName + ", " + post.location.CityName,
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
            setIsLoading(false)

            setPageCount(
                Math.round(total / 8) < total / 8 ? Math.round(total / 8) + 1 : Math.round(total / 8)
            )
            setCurrentPageData(arr)
        }

        if (!hasQuery)
            fetchData()
    }, [hasQuery, currentSearch])

    const onSearchCallback = async (search: Search) => {
        setIsLoading(true)
        setCurrentSearch(search)
        setCurrentPageData(new Array())
        window.scroll(0, 0)

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
                "max": parseInt(search.price?.max || '100000000000000'),
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
              "page": 1
            }), // string or object
            headers: {
              "Content-Type": "application/json",
            },
        })
        let data = await res.json()
        let total = data.data.count
        
        data = data.data.data
        let arr = new Array()

        data.forEach((post: any) => {
            let obj = {
                _id: post._id,
                title: post.title,
                address: post.location.DistrictPrefix + " " + post.location.DistrictName + ", " + post.location.CityName,
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

        setPageCount(
            Math.round(total / 8) < (total / 8) ? Math.round(total / 8) + 1 : Math.round(total / 8)
        )
        setCurrentPageIndex(1)
        setCurrentPageData(arr)
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
                                page={currentPageIndex}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     var homeSearch = context.query?.search
//     console.log(homeSearch)

//     return { props: { homeSearch } }
// }

export default ListEstate