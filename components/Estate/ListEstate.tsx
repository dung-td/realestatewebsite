import type { NextPage, GetServerSideProps } from "next"
import { useState, useEffect } from "react"
import { PostCard } from "../../interfaces/PostCard"
import EstateCard from "./EstateCard"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MoneyFormat from "../../util/MoneyFormat";


const ListEstate: NextPage = () => {
    const [posts, setPosts] = useState(new Array())
    const [sort, setSort] = useState('Thông thường')

    const handleSortResults = (e: any) => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            console.log("Getting post list from Server...")
            const res = await fetch(`http://localhost:3001/api/post/get`)
            let data = await res.json()
            
            data = data.data
            let posts = new Array()

            data.forEach((post: any) => {
                let obj = {
                    _id: post._id,
                    title: post.title,
                    address: post.address,
                    estateType: post.estateType,
                    thumbnail: post.images[0],
                    price: MoneyFormat(post.price) + " " + post.priceType,
                    area: post.area,
                    bathroom: post.bathroomNumber,
                    bedroom: post.bedroomNumber,
                    ownerName: post.owner.name,
                    ownerPhone: post.owner.phone,
                    titleColor: post.postType.title_color
                }
                posts.push(obj)
            })
            
            setPosts(posts)
        }

        fetchPosts()
    }, [])

    return (
        <>
            <div className="bg-white w-full">
                <div className="max-w-full mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:px-8" style={{maxWidth: '1200'}}>
                    <div className="grid">
                        <div className="flex flex-row mb-4 items-center justify-between">
                            <h2 className="font-bold text-base">Nhà bán/ Trang 1</h2>

                            <div className="w-[34%] sm:w-[20%] md:w-[20%] lg:w-[14%]">
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
                            posts.map((item) => {
                                return (
                                    <EstateCard
                                        key={item._id}
                                        id={item._id}
                                        title={item.title}
                                        imageUrl={item.thumbnail}
                                        category={item.estateType}
                                        price={item.price}
                                        areaSqr={item.area}
                                        rooms={item.bedroom + ' PN + ' + item.bathroom + ' WC'}
                                        address={item.address}
                                        titleColor={item.titleColor}
                                        author={item.ownerName}
                                        author_phone_number={item.ownerPhone}
                                    />
                                )
                            })
                        }
                    </div>

                    {/* Pagination */}
                    <div className="text-center mt-8">
                        <nav className="mt-4 relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-blue-500 hover:text-white">
                                <span className="sr-only">Previous</span>
                                
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            
                            <a href="#" aria-current="page" className="bg-blue-500 border-gray-300 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
                            <a href="#" className="bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                            <a href="#" className="bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
                            <a href="#" className="bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
                            <a href="#" className="bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
                            <a href="#" className="bg-white border-gray-300 text-black hover:bg-blue-500 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-black hover:bg-blue-500 hover:text-white">
                                <span className="sr-only">Next</span>
                                
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListEstate