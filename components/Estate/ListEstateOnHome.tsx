import type { NextPage } from "next"
import { useEffect, useState } from "react";
import CardOnHome from "./CardOnHome";
import MoneyFormat from "../../util/MoneyFormat";


const ListEstateOnHome: NextPage = () => {
    const [posts, setPosts] = useState(new Array())

    const list = [
        {
            id: 'id1',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://static.chotot.com/storage/chotot-kinhnghiem/nha/2021/10/cfa88710-mua-ban-nha-dat-1.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            upload_date: '2 ngày trước'
        },
        {
            id: 'id2',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://dat24h.com/uploads/news/2018/nha-dat.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn Văn Dũng',
            upload_date: '2 ngày trước'
        },
        {
            id: 'id3',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://happynest.vn/storage/uploads/2021/04/8d46d17e81cce979ee586c3f447c8c39.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            upload_date: '2 ngày trước'
        },
        {
            id: 'id4',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'http://xhomeviet.vn/Uploads/Images/z2255614633805-7e55ff5c8e3dcec942d717d5cebf0567.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            upload_date: '2 ngày trước'
        },
        {
            id: 'id5',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://dat24h.com/uploads/news/2018/nha-dat.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            upload_date: '2 ngày trước'
        },
        {
            id: 'id6',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://happynest.vn/storage/uploads/2021/04/8d46d17e81cce979ee586c3f447c8c39.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            upload_date: '2 ngày trước'
        },
        {
            id: 'id7',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://dat24h.com/uploads/news/2018/nha-dat.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            upload_date: '2 ngày trước'
        },
        {
            id: 'id8',
            title: 'BÁN NHÀ MỚI XÂY MỘT MẶT TIỀN - AEON BÌNH DƯƠNG',
            imageUrl: 'https://happynest.vn/storage/uploads/2021/04/8d46d17e81cce979ee586c3f447c8c39.jpg',
            price: '2 tỷ ',
            areaSqr: '40 m²',
            address: 'Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương',
            author: 'Nguyễn A',
            upload_date: '2 ngày trước'
        },
    ];

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
                    publishDate: post.publishedDate
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
                <div className="mx-auto py-8 px-4 max-w-full" style={{maxWidth: '1200'}}>
                    <div className="grid">
                        <h2 className="font-bold mb-4">BẤT ĐỘNG SẢN DÀNH CHO BẠN</h2>
                        <hr className="w-1/3 ml:0 -mt-3 mb-4 border-black"/>
                    </div>
                
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6">
                        {
                            posts.map((item) => {
                                return (
                                    <CardOnHome
                                        key={item._id}
                                        id={item._id}
                                        title={item.title}
                                        imageUrl={item.thumbnail}
                                        price={item.price}
                                        areaSqr={item.area}
                                        address={item.address}
                                        author={item.ownerName}
                                        upload_date={item.publishDate}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="my-4 text-center">
                        <button className="w-28 h-9 border border-solid border-gray-300 rounded-lg hover:border-black" title="Xem thêm">
                            <p className="text-xs font-medium">Xem thêm</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListEstateOnHome