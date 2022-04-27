import type { NextPage } from "next"
import EstateCard from "./EstateCard"

const ListEstate: NextPage = () => {
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

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-6xl lg:px-8" style={{maxWidth: '1200'}}>
                    <div className="flex flex-row mb-4 items-center justify-between">
                        <h2 className="font-bold text-base">Nhà bán/ Trang 1</h2>

                        <div className="w-[34%] sm:w-[20%] md:w-[20%] lg:w-[14%]">
                            <select id="district" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2 " required onChange={(e) => handleSortResults(e)}>
                                <option>Thông thường</option>
                                <option>Mới nhất</option>
                                <option>Cũ nhất</option>
                                <option>Giá thấp đến cao</option>
                                <option>Giá cao đến thấp</option>
                            </select>
                        </div>
                    </div>
                
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
                        {
                            list.map((item) => {
                                return (
                                    <EstateCard
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        imageUrl={item.imageUrl}
                                        category={item.category}
                                        price={item.price}
                                        areaSqr={item.areaSqr}
                                        rooms={item.rooms}
                                        address={item.address}
                                        author={item.author}
                                        author_phone_number={item.author_phone_number}
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
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
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
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
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