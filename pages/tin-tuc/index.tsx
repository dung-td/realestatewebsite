import type { NextPage, GetServerSideProps } from "next"
<<<<<<< HEAD
// import Footer from "../../components/Footer"
// import Header from "../../components/Header"
import { useState } from "react"
import { News } from "../../interfaces/News"
import { MessageTwoTone, NewspaperSharp } from "@mui/icons-material"

type Props = {
    newss: News[]
}

const Tintuc = ({ newss }: Props) => {
    const day= new Date().getFullYear()

    const filterNewsByType = (type: string) => {
        let newsarray = new Array()
        newss.forEach((news: any) => {
            let obj = {
                _id: news._id,
                title: news.title,
                //body: news.body,
                tags: news.tags,
                author: news.author,
                views: news.views,
                type: news.type,
                submitday: news.submitday,
                description: news.description
            }
            if (obj.type == type)
                newsarray.push(obj)
        })

        return { props: { newsarray } }
    }

    const calculateTime = (time: Date) => {
        let current= new Date().getDate()
        let count = current - time.getDate()
        return count
    }

    return <div className="space-y-16">
        {/* <Header /> */}
        <div className="md:container  md:mx-auto px-36">
            <div className="w-5/12" style={{ borderBottom: "2px solid red" }}>
                <h2 className="font-bold">TIN TỨC NỔI BẬT</h2>
            </div>
            <div className="flex pt-4 space-x-6">
                <div className="w-5/12 space-y-2">
                    <a href="tin-tuc\thi-truong">
                        {filterNewsByType("bat dong san moi").props.newsarray.map((newss) => {
                            return <>
                                <img className="w-full cursor-pointer" id="title img" alt="tieu-diem-thi-truong-title-img" src="#"></img>
                                <h3 className="font-medium hover:text-gray-400 cursor-pointer">{newss.title}</h3>
                                <p className="text-xs">{newss.submitday} trước - Admin</p>
                                <p className="text-sm">{newss.description}</p>
                            </>
                        })}
                    </a>
                </div>
                <div className="break-before-column grid w-3/12 text-sm space-y-4">
                    <p className="justify-self-end text-red-600 hover:text-red-400 cursor-pointer">Xem thêm</p>
                    <ul className="divide-y space-y-4">
                        <li className="hover:text-gray-400 cursor-pointer">Nhà đầu tư tìm kiếm gì ở vùng trũng bất động sản, liệu đây có là xu hướng mới</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                    </ul>
                </div>
                <div className="break-before-column w-4/12">
                    <img className="cursor-pointer" id="ads img" alt="anh-quang-cao-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"></img>
                </div>
            </div>
        </div>

        <div className="md:container md:mx-auto px-36">
            <div className="w-5/12" style={{ borderBottom: "2px solid red" }}>
                <h2 className="font-bold">TIN TỨC HÀNG ĐẦU</h2>
            </div>
            <div className="flex space-x-4">
                <div className="w-8/12 pt-4">
                    <div className="columns-3">
                        <div className="break-afer-column">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                            <p className="text-xs cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</p>
                        </div>
                        <div className="break-after-column">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                            <p className="text-xs cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</p>
                        </div>
                        <div className="">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                            <p className="text-xs cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</p>
                        </div>
                    </div>
                    <div className="space-y-4 pt-6">
                        <div className="flex space-x-4">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4lFxVDJNZJv6Gm57IIYuyzYSSkkIY-2WZA&usqp=CAU"></img>
                            <div className="text-sm">
                                <span className="font-semibold text-red-600 text-xs">QUY HOẠCH</span>
                                <h3 className="font-bold cursor-pointer hover:text-gray-400">Quy hoạch Thủ đô Hà Nội phải thể hiện quan điểm đổi mới mạnh mẽ tư duy phát triển</h3>
                                <p>Phó Thủ tướng Lê Văn Thành vừa ký Quyết định số 313/QĐ-TTg ngày 7-3-2022 phê duyệt nhiệm vụ lập Quy hoạch Thủ đô Hà Nội thời kỳ 2021-2030, tầm nhìn đến năm 2050.</p>
                                <p className="text-xs">1 tháng trước - Admin</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4lFxVDJNZJv6Gm57IIYuyzYSSkkIY-2WZA&usqp=CAU"></img>
                            <div className="text-sm">
                                <span className="font-semibold text-red-600 text-xs">QUY HOẠCH</span>
                                <h3 className="font-bold cursor-pointer hover:text-gray-400">Quy hoạch Thủ đô Hà Nội phải thể hiện quan điểm đổi mới mạnh mẽ tư duy phát triển</h3>
                                <p>Phó Thủ tướng Lê Văn Thành vừa ký Quyết định số 313/QĐ-TTg ngày 7-3-2022 phê duyệt nhiệm vụ lập Quy hoạch Thủ đô Hà Nội thời kỳ 2021-2030, tầm nhìn đến năm 2050.</p>
                                <p className="text-xs">1 tháng trước - Admin</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4lFxVDJNZJv6Gm57IIYuyzYSSkkIY-2WZA&usqp=CAU"></img>
                            <div className="text-sm">
                                <span className="font-semibold text-red-600 text-xs">QUY HOẠCH</span>
                                <h3 className="font-bold cursor-pointer hover:text-gray-400">Quy hoạch Thủ đô Hà Nội phải thể hiện quan điểm đổi mới mạnh mẽ tư duy phát triển</h3>
                                <p>Phó Thủ tướng Lê Văn Thành vừa ký Quyết định số 313/QĐ-TTg ngày 7-3-2022 phê duyệt nhiệm vụ lập Quy hoạch Thủ đô Hà Nội thời kỳ 2021-2030, tầm nhìn đến năm 2050.</p>
                                <p className="text-xs">1 tháng trước - Admin</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4lFxVDJNZJv6Gm57IIYuyzYSSkkIY-2WZA&usqp=CAU"></img>
                            <div className="text-sm">
                                <span className="font-semibold text-red-600 text-xs">QUY HOẠCH</span>
                                <h3 className="font-bold cursor-pointer hover:text-gray-400">Quy hoạch Thủ đô Hà Nội phải thể hiện quan điểm đổi mới mạnh mẽ tư duy phát triển</h3>
                                <p>Phó Thủ tướng Lê Văn Thành vừa ký Quyết định số 313/QĐ-TTg ngày 7-3-2022 phê duyệt nhiệm vụ lập Quy hoạch Thủ đô Hà Nội thời kỳ 2021-2030, tầm nhìn đến năm 2050.</p>
                                <p className="text-xs">1 tháng trước - Admin</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4lFxVDJNZJv6Gm57IIYuyzYSSkkIY-2WZA&usqp=CAU"></img>
                            <div className="text-sm">
                                <span className="font-semibold text-red-600 text-xs">QUY HOẠCH</span>
                                <h3 className="font-bold cursor-pointer hover:text-gray-400">Quy hoạch Thủ đô Hà Nội phải thể hiện quan điểm đổi mới mạnh mẽ tư duy phát triển</h3>
                                <p>Phó Thủ tướng Lê Văn Thành vừa ký Quyết định số 313/QĐ-TTg ngày 7-3-2022 phê duyệt nhiệm vụ lập Quy hoạch Thủ đô Hà Nội thời kỳ 2021-2030, tầm nhìn đến năm 2050.</p>
                                <p className="text-xs">1 tháng trước - Admin</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <img className="cursor-pointer" id="" alt="anh-tieude-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4lFxVDJNZJv6Gm57IIYuyzYSSkkIY-2WZA&usqp=CAU"></img>
                            <div className="text-sm">
                                <span className="font-semibold text-red-600 text-xs">QUY HOẠCH</span>
                                <h3 className="font-bold cursor-pointer hover:text-gray-400">Quy hoạch Thủ đô Hà Nội phải thể hiện quan điểm đổi mới mạnh mẽ tư duy phát triển</h3>
                                <p>Phó Thủ tướng Lê Văn Thành vừa ký Quyết định số 313/QĐ-TTg ngày 7-3-2022 phê duyệt nhiệm vụ lập Quy hoạch Thủ đô Hà Nội thời kỳ 2021-2030, tầm nhìn đến năm 2050.</p>
                                <p className="text-xs">1 tháng trước - Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img className="cursor-pointer" id="ads img" alt="anh-quang-cao-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"></img>
                </div>
            </div>
        </div>

        <div className="md:container  md:mx-auto px-36">
            <div className="w-5/12" style={{ borderBottom: "2px solid red" }}>
                <h2 className="font-bold">TIN TỨC NỔI BẬT</h2>
            </div>
            <div className="flex pt-4 space-x-6">
                <div className="w-5/12 space-y-2">
                    <img className="w-full" id="title img" alt="tieu-diem-thi-truong-title-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                    <h3 className="font-medium hover:text-gray-400 cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</h3>
                    <p className="text-xs">1 tháng trước - Admin</p>
                    <p className="text-sm">Trong bối cảnh nền kinh tế đang dần hồi phục, thị trường bất động sản trong nước cũng đang có những dấu hiệu trở lại, cùng với batdongsan88 điểm qua những thông tin về thị trường bất động sản trong tháng đầu tiên của năm 2022</p>
                </div>
                <div className="break-before-column grid w-3/12 text-sm space-y-4">
                    <p className="justify-self-end text-red-600 hover:text-red-400 cursor-pointer">Xem thêm</p>
                    <ul className="divide-y space-y-4">
                        <li className="hover:text-gray-400 cursor-pointer">Nhà đầu tư tìm kiếm gì ở vùng trũng bất động sản, liệu đây có là xu hướng mới</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                    </ul>
                </div>
                <div className="break-before-column w-4/12">
                    <img className="cursor-pointer" id="ads img" alt="anh-quang-cao-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"></img>
                </div>
            </div>
        </div>

        <div className="md:container  md:mx-auto px-36">
            <div className="w-5/12" style={{ borderBottom: "2px solid red" }}>
                <h2 className="font-bold">TIN TỨC NỔI BẬT</h2>
            </div>
            <div className="flex pt-4 space-x-6">
                <div className="w-5/12 space-y-2">
                    <img className="w-full" id="title img" alt="tieu-diem-thi-truong-title-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                    <h3 className="font-medium hover:text-gray-400 cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</h3>
                    <p className="text-xs">1 tháng trước - Admin</p>
                    <p className="text-sm">Trong bối cảnh nền kinh tế đang dần hồi phục, thị trường bất động sản trong nước cũng đang có những dấu hiệu trở lại, cùng với batdongsan88 điểm qua những thông tin về thị trường bất động sản trong tháng đầu tiên của năm 2022</p>
                </div>
                <div className="break-before-column grid w-3/12 text-sm space-y-4">
                    <p className="justify-self-end text-red-600 hover:text-red-400 cursor-pointer">Xem thêm</p>
                    <ul className="divide-y space-y-4">
                        <li className="hover:text-gray-400 cursor-pointer">Nhà đầu tư tìm kiếm gì ở vùng trũng bất động sản, liệu đây có là xu hướng mới</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                    </ul>
                </div>
                <div className="break-before-column w-4/12">
                    <img className="cursor-pointer" id="ads img" alt="anh-quang-cao-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"></img>
                </div>
            </div>
        </div>

        <div className="md:container  md:mx-auto px-36">
            <div className="w-5/12" style={{ borderBottom: "2px solid red" }}>
                <h2 className="font-bold">TIN TỨC NỔI BẬT</h2>
            </div>
            <div className="flex pt-4 space-x-6">
                <div className="w-5/12 space-y-2">
                    <img className="w-full" id="title img" alt="tieu-diem-thi-truong-title-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                    <h3 className="font-medium hover:text-gray-400 cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</h3>
                    <p className="text-xs">1 tháng trước - Admin</p>
                    <p className="text-sm">Trong bối cảnh nền kinh tế đang dần hồi phục, thị trường bất động sản trong nước cũng đang có những dấu hiệu trở lại, cùng với batdongsan88 điểm qua những thông tin về thị trường bất động sản trong tháng đầu tiên của năm 2022</p>
                </div>
                <div className="break-before-column grid w-3/12 text-sm space-y-4">
                    <p className="justify-self-end text-red-600 hover:text-red-400 cursor-pointer">Xem thêm</p>
                    <ul className="divide-y space-y-4">
                        <li className="hover:text-gray-400 cursor-pointer">Nhà đầu tư tìm kiếm gì ở vùng trũng bất động sản, liệu đây có là xu hướng mới</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                    </ul>
                </div>
                <div className="break-before-column w-4/12">
                    <img className="cursor-pointer" id="ads img" alt="anh-quang-cao-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"></img>
                </div>
            </div>
        </div>

        <div className="md:container  md:mx-auto px-36">
            <div className="w-5/12" style={{ borderBottom: "2px solid red" }}>
                <h2 className="font-bold">TIN TỨC NỔI BẬT</h2>
            </div>
            <div className="flex pt-4 space-x-6">
                <div className="w-5/12 space-y-2">
                    <img className="w-full" id="title img" alt="tieu-diem-thi-truong-title-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                    <h3 className="font-medium hover:text-gray-400 cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</h3>
                    <p className="text-xs">1 tháng trước - Admin</p>
                    <p className="text-sm">Trong bối cảnh nền kinh tế đang dần hồi phục, thị trường bất động sản trong nước cũng đang có những dấu hiệu trở lại, cùng với batdongsan88 điểm qua những thông tin về thị trường bất động sản trong tháng đầu tiên của năm 2022</p>
                </div>
                <div className="break-before-column grid w-3/12 text-sm space-y-4">
                    <p className="justify-self-end text-red-600 hover:text-red-400 cursor-pointer">Xem thêm</p>
                    <ul className="divide-y space-y-4">
                        <li className="hover:text-gray-400 cursor-pointer">Nhà đầu tư tìm kiếm gì ở vùng trũng bất động sản, liệu đây có là xu hướng mới</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                    </ul>
                </div>
                <div className="break-before-column w-4/12">
                    <img className="cursor-pointer" id="ads img" alt="anh-quang-cao-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"></img>
                </div>
            </div>
        </div>

        <div className="md:container  md:mx-auto px-36">
            <div className="w-5/12" style={{ borderBottom: "2px solid red" }}>
                <h2 className="font-bold">TIN TỨC NỔI BẬT</h2>
            </div>
            <div className="flex pt-4 space-x-6">
                <div className="w-5/12 space-y-2">
                    <img className="w-full" id="title img" alt="tieu-diem-thi-truong-title-img" src="https://batdongsan.com.vn/interaktivestory/tieu-diem-thi-truong-bds-t1-2022/images/logo-sharefacebook.jpg"></img>
                    <h3 className="font-medium hover:text-gray-400 cursor-pointer">TIÊU ĐIỂM THỊ TRƯỜNG BẤT ĐỘNG SẢN THÁNG 01-2022</h3>
                    <p className="text-xs">1 tháng trước - Admin</p>
                    <p className="text-sm">Trong bối cảnh nền kinh tế đang dần hồi phục, thị trường bất động sản trong nước cũng đang có những dấu hiệu trở lại, cùng với batdongsan88 điểm qua những thông tin về thị trường bất động sản trong tháng đầu tiên của năm 2022</p>
                </div>
                <div className="break-before-column grid w-3/12 text-sm space-y-4">
                    <p className="justify-self-end text-red-600 hover:text-red-400 cursor-pointer">Xem thêm</p>
                    <ul className="divide-y space-y-4">
                        <li className="hover:text-gray-400 cursor-pointer">Nhà đầu tư tìm kiếm gì ở vùng trũng bất động sản, liệu đây có là xu hướng mới</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                        <li className="hover:text-gray-400 cursor-pointer">Du lịch mở cửa, thị trường bất động sản hồi phục</li>
                    </ul>
                </div>
                <div className="break-before-column w-4/12">
                    <img className="cursor-pointer" id="ads img" alt="anh-quang-cao-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFr63DFzz1D8HptW3ynyZJJyqs7wBkOwvxg&usqp=CAU"></img>
                </div>
            </div>
        </div>
        {/* <Footer /> */}
    </div>
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(`http://localhost:3031/api/news/get`)
    let data = await res.json()
    data = data.data
    let newss = new Array()
    data.forEach((news: any) => {
        let obj = {
            _id: news._id,
            title: news.title,
            //body: news.body,
            tags: news.tags,
            author: news.author,
            views: news.views,
            type: news.type,
            submitday: news.submitday,
            description: news.description
        }
        newss.push(obj)
    })

    return {
        props: { newss }
    }
}

export default Tintuc
=======
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../../components/admin/Header"
import NewsSection from "../../components/News/Section"
import ListNews from "../../components/News/List"

import server from "../../interfaces/server"
import News from "../../interfaces/news"

type Props = {
  popularNews: News[]
}

const NewsHome = ({ popularNews }: Props) => {
  return (
    <>
      <Header />

      <div className="space-y-16 mt-8">
        {popularNews.length > 0 ? (
          <NewsSection typeSlug="tin-noi-bat" news={popularNews} />
        ) : null}

        {/* <ListNews news={news} title="Tin nổi bật" /> */}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Getting news
  const popularNews = await (await getPopularNews()).news
  return { props: { popularNews } }
}

const getPopularNews = async () => {
  const res = await fetch(`${server}/news/popular?limit=7`)
  let data = await res.json()
  const news = data.data

  return { news }
}

export default NewsHome
>>>>>>> 9c27a9012e2ee8db3a02a0901edc570dce3d5cbd
