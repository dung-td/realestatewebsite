import type { NextPage } from "next"
import EstateCard from "./EstateCard"
import CardOnHome from "./CardOnHome";

const ListEstateOnHome: NextPage = () => {
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
            author: 'Nguyễn A',
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
    ];

    const handleSortResults = (e: any) => {

    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto py-8 px-4 max-w-4xl" style={{maxWidth: '1200'}}>
                    <h2 className="font-bold mb-4">BẤT ĐỘNG SẢN DÀNH CHO BẠN</h2>
                    <hr className="w-1/3 ml:0 -mt-3 mb-4 border-black"/>
                
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-2">
                        {
                            list.map((item) => {
                                return (
                                    <CardOnHome
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        imageUrl={item.imageUrl}
                                        price={item.price}
                                        areaSqr={item.areaSqr}
                                        address={item.address}
                                        author={item.author}
                                        upload_date={item.upload_date}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="my-4 text-center">
                        <button className="w-28 h-9 border border-solid border-gray-300 rounded-lg hover:border-black" title="Xem thêm">
                            <p className="text-xs">Xem thêm</p>
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ListEstateOnHome