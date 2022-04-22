import React, { useState } from "react"
//import ReactVerifyCode from 'react-verify-code'
//const ReactVerifyCode = require('react-verify-code')

export default function DangKy() {
    const [showModal, setShowModal] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const isShowPassword = () => {
        setShowPassword(val => !val)
        if (showPassword == true) {
            return (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>);
        }
        return (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>);
    }

    return (
        <>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Open modal dang-ky
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="w-[28rem] relative my-6 mx-auto max-w-3xl md-3 items-stretch">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Đăng ký tài khoản
                                    </h3>
                                    <button
                                        className="p-1 ml-auto border-0 text-black opacity-30 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form action="" className="space-y-4">
                                        <input className="px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="text" placeholder="Tên đăng nhập*" name="accountname" required></input>
                                        <input className="px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="text" placeholder="Địa chỉ email*" name="email" required></input>
                                        <div className="flex flex-wrap w-full">
                                            <input className="basis-1/2 px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="password" placeholder="Mật khẩu*" name="password" required></input>
                                            <input className="basis-1/2 px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="password" placeholder="Nhập lại mật khẩu*" name="re-password" required></input>
                                        </div>
                                        <p>Thông tin cá nhân</p>
                                        <input className="px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="text" placeholder="Tên đầy đủ*" name="fullname" required></input>
                                        <input className="px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="text" placeholder="Ngày sinh" name="dob" required></input>
                                        <select className="px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" name="province/city" >
                                            <option>Tỉnh/Thành</option>
                                        </select>
                                        <select className="px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" value="Quận/Huyện" name="district">
                                            <option>Quận/Huyện</option>
                                        </select>
                                        <select className="px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" value="Phường/Xã" name="ward">
                                            <option>Phường/Xã</option>
                                        </select>
                                        <div className="space-x-32">
                                            <input className="w-4 h-4 mr-1 cursor-pointer" type="radio" checked name="sex"></input>
                                            Nam
                                            <input className="w-4 h-4 mr-1 cursor-pointer" type="radio" name="sex"></input>
                                            Nữ
                                        </div>
                                        <p className="">Bạn là?</p>
                                        <div className="space-x-28">
                                            <input className="w-4 h-4 mr-1 cursor-pointer" type="radio" checked name="personal"></input>Cá nhân
                                            <input className="w-4 h-4 mr-1 cursor-pointer" type="radio" name="personal"></input>Công ty
                                        </div>
                                        <div className="space-y-4">
                                            <input className="w-full px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="text" placeholder="Mã số thuế cá nhân/ CMND" name="identity number" required></input>
                                            <input className="w-1/2 px3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none focus:border-black w-full pl-5" type="text" placeholder="Nhập mã xác nhận" name="verify code" required></input>
                                            {/*<ReactVerifyCode/>*/}
                                        </div>
                                        <div className="flex space-x-2">
                                            <input className="mt-1 w-4 h-4 cursor-pointer" type="checkbox"></input><p>Tôi đồng ý với các điều khoản, điều kiện & chính sách của ...</p>
                                        </div>
                                        <button className="w-full h-12 rounded bg-red-600 text-white" type="submit">Đăng ký</button>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="relative p-6 flex-auto">
                                    <p><b>Chú ý:</b> Thông tin Tên đăng nhập, email không thể thay đổi sau khi đăng ký.</p>
                                    <p>Để được trợ giúp, vui lòng liên hệ tổng đài CSKH <span className="text-red-500 cursor-pointer">1900 1881</span> hoặc email <span className="text-red-500 cursor-pointer">hotro@...</span></p>
                                    <p className="p-6 text-center">Đã là thành viên? <span className="text-red-500 cursor-pointer">Đăng nhập</span> tại đây</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black">

                    </div>
                </>
            ) : null}
        </>
    );
}