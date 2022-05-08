import type { NextPage, GetServerSideProps } from "next"
import { useState, useEffect } from "react"
import { PostCard } from "../../interfaces/PostCard"
import EstateCard from "./EstateCard"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ListEstate: NextPage = () => {
    const [posts, setPosts] = useState(new Array())
    const [sort, setSort] = useState('Thông thường')

    const list = [
        {
            id: 'id1',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://static.chotot.com/storage/chotot-kinhnghiem/nha/2021/10/cfa88710-mua-ban-nha-dat-1.jpg',
            category: 'Nhà riêng',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            rooms: '2 PN + 2 WC',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            author_phone_number: '0914 321 878'
        },
        {
            id: 'id2',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://dat24h.com/uploads/news/2018/nha-dat.jpg',
            category: 'Nhà riêng',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            rooms: '2 PN + 2 WC',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            author_phone_number: '0914 321 878'
        },
        {
            id: 'id3',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://happynest.vn/storage/uploads/2021/04/8d46d17e81cce979ee586c3f447c8c39.jpg',
            category: 'Nhà riêng',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            rooms: '2 PN + 2 WC',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            author_phone_number: '0914 321 878'
        },
        {
            id: 'id4',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'http://xhomeviet.vn/Uploads/Images/z2255614633805-7e55ff5c8e3dcec942d717d5cebf0567.jpg',
            category: 'Nhà riêng',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            rooms: '2 PN + 2 WC',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            author_phone_number: '0914 321 878'
        }
    ];

    const handleSortResults = (e: any) => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            console.log("Getting post list from Server...")
            const res = await fetch(`http://localhost:3001/api/post/list-post?purpose=sale`)
            let data = await res.json()
            
            data = data.data
            let posts = new Array()

            data.forEach((post: any) => {
                let obj = {
                    _id: post._id,
                    title: post.title,
                    address: post.address,
                    estateType: {
                        _id: post.estateType._id,
                        name: post.estateType.name
                    },
                    thumbnail: post.images[0],
                    price: post.price,
                    area: post.area,
                    bathroom: post.bathroomNumber,
                    bedroom: post.bedroomNumber,
                    ownerId: post.ownerId,
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
                                        category={item.estateType.name}
                                        price={item.price}
                                        areaSqr={item.area}
                                        rooms={item.bedroom + ' PN + ' + item.bathroom + ' WC'}
                                        address={item.address}
                                        author={item.ownerId}
                                        author_phone_number={item.ownerId}
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