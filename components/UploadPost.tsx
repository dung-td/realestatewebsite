import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

const UploadPost: NextPage = () => {
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

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8" style={{maxWidth: '1200'}}>
                    <h2 className="font-bold text-xl text-center mb-4">Đăng tin</h2>
                
                    <div className="flex flex-col lg:flex-row justify-center">
                        {/* Form thông tin bài đăng */}
                        <div className="post-info flex flex-col w-full lg:w-2/5">
                            {/* Thông tin cơ bản */}
                            <div className="flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Thông tin cơ bản</h1>
                                <div className="flex flex-row">
                                    <p className="text-sm">Thông tin có dấu</p>
                                    <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                                    <p className="text-sm">là bắt buộc</p>
                                </div>
                                
                                <div className="mt-4">
                                    <fieldset className="flex flex-row">
                                        <legend className="sr-only">Post type</legend>
                                        <div className="flex items-center mb-4">
                                            <input id="type-option-1" type="radio" name="types" value="sell" className="w-5 h-5 border-gray-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" checked/>
                                            <label htmlFor="type-option-1" className="block ml-2 text-sm text-black">
                                            BÁN
                                            </label>
                                        </div>

                                        <div className="flex items-center mb-4 ml-12">
                                            <input id="type-option-2" type="radio" name="types" value="rent" className="w-5 h-5 border-gray-300" aria-labelledby="country-option-2" aria-describedby="country-option-2"/>
                                            <label htmlFor="type-option-2" className="block ml-2 text-sm text-black">
                                            CHO THUÊ
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="mt-2 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Loại bất động sản</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <select id="countries" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-full p-2 hover:border-black">
                                        <option>Bán nhà riêng</option>
                                        <option>Bán căn hộ chung cư</option>
                                        <option>Bán đất</option>
                                        <option>Bán kho xưởng</option>
                                    </select>
                                </div>

                                <div className="mt-2 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Địa chỉ</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input type="email" id="email" className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="Địa chỉ hiển thị" required/>
                                </div>

                                <div className="flex flex-row flex-wrap items-center justify-between">
                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Tỉnh, thành phố</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="city" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-full p-2 hover:border-black" required>
                                            <option>Bình Dương</option>
                                            <option>TP. HCM</option>
                                            <option>Hà Nội</option>
                                            <option>Đà Nẵng</option>
                                        </select>
                                    </div>

                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Quận, huyện</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="district" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-full p-2 hover:border-black" required>
                                            <option>Bình Dương</option>
                                            <option>TP. HCM</option>
                                            <option>Hà Nội</option>
                                            <option>Đà Nẵng</option>
                                        </select>
                                    </div>

                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Phường, xã</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="quarter" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-full p-2 hover:border-black" required>
                                            <option>Bình Dương</option>
                                            <option>TP. HCM</option>
                                            <option>Hà Nội</option>
                                            <option>Đà Nẵng</option>
                                        </select>
                                    </div>

                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Đường, phố</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="street" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-full p-2 hover:border-black" required>
                                            <option>Bình Dương</option>
                                            <option>TP. HCM</option>
                                            <option>Hà Nội</option>
                                            <option>Đà Nẵng</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin bài viết */}
                            <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Thông tin bài viết</h1>
                                <div className="flex flex-row">
                                    <p className="text-sm">Thông tin có dấu</p>
                                    <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                                    <p className="text-sm">là bắt buộc</p>
                                </div>

                                <div className="mt-4 mb-2">
                                    <div className="flex flex-row">
                                        <label className="block mb-2 text-sm font-medium text-black">Tiêu đề</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <textarea name="title" id="title" cols={1} rows={2} className="bg-white h-16 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 resize-none hover:border-black" placeholder="Tiêu đề hiển thị" required></textarea>
                                    <p className="text-xs mt-2">Tối thiểu 30 ký tự, tối đa 99 ký tự</p>
                                </div>

                                <div className="mt-4 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Mô tả</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <textarea name="title" id="title" cols={1} rows={2} className="bg-white h-44 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 resize-none hover:border-black" placeholder="Nhập mô tả về bất động sản của bạn" required></textarea>
                                    <p className="text-xs mt-2">Tối thiểu 30 ký tự, tối đa 4000 ký tự</p>
                                </div>
                            </div>

                            {/* Thông tin BĐS */}
                            <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Thông tin bất động sản</h1>
                                <div className="flex flex-row">
                                    <p className="text-sm">Thông tin có dấu</p>
                                    <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                                    <p className="text-sm">là bắt buộc</p>
                                </div>

                                <div className="mt-4 mb-2 w-1/3">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Diện tích (m²)</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input type="email" id="email" className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="Diện tích (m²)" required/>
                                </div>

                                <div className="mt-4 mb-2 w-full flex flex-row justify-between">
                                    <div className="w-3/5">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Mức giá</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <input type="email" id="email" className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="Mức giá" required/>
                                    </div>

                                    <div className="w-2/6">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Đơn vị</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="price_unit" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-full p-2 hover:border-black">
                                            <option>VND</option>
                                            <option>Giá / m²</option>
                                            <option>Thỏa thuận</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Giấy tờ pháp lý */}
                                <div className="mt-4 mb-2 w-full flex flex-col">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Giấy tờ pháp lý</label>

                                    <fieldset className="flex flex-row flex-wrap justify-between">
                                        <legend className="sr-only">Docs</legend>
                                        <div className="flex items-center mb-4">
                                            <input id="doc-option-1" type="radio" name="docs" value="doc-1" className="w-5 h-5 border-gray-300" aria-labelledby="docs-option-1" aria-describedby="docs-option-1"/>
                                            <label htmlFor="doc-option-1" className="block ml-2 text-sm text-black">
                                            Sổ đỏ/ Sổ hồng
                                            </label>
                                        </div>

                                        <div className="flex items-center mb-4">
                                            <input id="doc-option-2" type="radio" name="docs" value="doc-2" className="w-5 h-5 border-gray-300" aria-labelledby="docs-option-2" aria-describedby="docs-option-2"/>
                                            <label htmlFor="doc-option-2" className="block ml-2 text-sm text-black">
                                            Hợp đồng mua bán
                                            </label>
                                        </div>

                                        <div className="flex items-center mb-4">
                                            <input id="doc-option-3" type="radio" name="docs" value="doc-3" className="w-5 h-5 border-gray-300" aria-labelledby="docs-option-3" aria-describedby="docs-option-3"/>
                                            <label htmlFor="doc-option-3" className="block ml-2 text-sm text-black">
                                            Đang chờ sổ
                                            </label>
                                        </div>

                                        <div className="flex items-center mb-4">
                                            <input id="doc-option-4" type="radio" name="docs" value="doc-4" className="w-7 h-7 border-gray-300" aria-labelledby="docs-option-4" aria-describedby="docs-option-4"/>
                                            <label htmlFor="doc-option-4" className="block ml-2 text-sm text-black">
                                            Khác
                                            </label>
                                            <input type="email" id="email" className="bg-white ml-3 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="Nhập" required/>
                                        </div>
                                    </fieldset>
                                </div>

                                <hr/>

                                <div className="mt-2 mb-1 w-full flex flex-row flex-wrap justify-between">
                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số tầng</label>
                                        <input type="text" id="floors" className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="0" required/>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Chiều rộng</label>
                                        <input type="email" id="width" className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="(m)" required/>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số phòng ngủ</label>
                                        <input type="email" id="bedrooms" className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="0" required/>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Chiều sâu</label>
                                        <input type="email" id="depth" className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="(m)" required/>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số phòng tắm</label>
                                        <input type="email" id="bathrooms" className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="0" required/>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Đường rộng</label>
                                        <input type="email" id="entrance-width" className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 hover:border-black" placeholder="(m)" required/>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Hướng nhà</label>
                                        <select id="direction" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-3/5 p-2 hover:border-black">
                                            <option>Đông</option>
                                            <option>Tây</option>
                                            <option>Nam</option>
                                            <option>Bắc</option>
                                            <option>Tây Bắc</option>
                                            <option>Đông Bắc</option>
                                            <option>Đông Nam</option>
                                            <option>Tây Nam</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Nội thất</label>
                                        <select id="furniture" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-3/5 p-2 hover:border-black">
                                            <option>Đầy đủ</option>
                                            <option>Không có</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Upload ảnh */}
                            <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Hình ảnh</h1>
                                
                                <div className="mt-2 w-1/3 self-center">
                                    <label htmlFor="file-upload" className="block px-9 lg:px-10 py-2 h-10 text-sm font-medium text-black bg-white rounded-lg border border-gray-300 cursor-pointer hover:border-black">Chọn ảnh</label>
                                    <input className="hidden" aria-describedby="file-upload" id="file-upload" type="file"/>
                                </div>
                            </div>

                            {/* <div className="relative inline-block text-left">
                                <div>
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    Options
                                    
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                    </button>
                                </div>

                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                    <div className="py-1" role="none">
                                    
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Account settings</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Support</a>
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">License</a>
                                    <form method="POST" action="#" role="none">
                                        <button type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-3">Sign out</button>
                                    </form>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Loại bài đăng */}
                        <div className="post-type w-full mt-8 lg:mt-0 lg:w-1/4 lg:ml-4 h-max flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
                            <div className="mt-2 mb-2">
                                <div className="flex flex-row">
                                    <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Loại tin đăng</label>
                                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                </div>
                                <select id="post-type" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-3/5 p-2 hover:border-black">
                                    <option>VIP 1</option>
                                    <option>VIP 2</option>
                                    <option>VIP 3</option>
                                    <option>Tin thường</option>
                                </select>
                            </div>

                            <div className="flex flex-row justify-between">
                                <div className="mt-2 mb-2 w-2/5">
                                    <div className="flex flex-row">
                                        <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Số ngày đăng</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <select id="post-type" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:border-black block w-full p-2 hover:border-black">
                                        <option>7 ngày</option>
                                        <option>10 ngày</option>
                                        <option>14 ngày</option>
                                        <option>21 ngày</option>
                                    </select>
                                </div>

                                <div className="mt-2 mb-2" style={{width: '54%'}}>
                                    <div className="flex flex-row">
                                        <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Ngày bắt đầu</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input type="date" className="bg-white px-1 pl-2 h-10 border border-gray-300 text-black sm:text-sm rounded-lg hover:border-black" placeholder="Select date" style={{width: '98%'}}></input>
                                </div>
                            </div>

                            <div className="bg-blue-200 w-full h-40 py-1 px-3 mt-4 rounded-lg">
                                <div className="flex flex-row justify-between mt-2 mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Loại tin đăng</p>
                                    <p className="text-black text-sm">VIP 1</p>
                                </div>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Đơn giá / ngày</p>
                                    <p className="text-black text-sm">2.300 VNĐ</p>
                                </div>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Số ngày đăng</p>
                                    <p className="text-black text-sm">10 ngày</p>
                                </div>

                                <hr className="border-1 border-solid border-black"/>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-lg font-medium">Bạn trả</p>
                                    <p className="text-black text-lg font-medium">23.000 VNĐ</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-black w-full lg:w-1/12 mx-auto px-2 py-2 mt-6 rounded-lg text-center cursor-pointer hover:opacity-70">
                            <p className="text-white text-center">Đăng tin {'>'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadPost