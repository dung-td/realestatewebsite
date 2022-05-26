import type { NextPage } from "next"
import { useState } from "react"

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    return (
        <div className="flex flex-col px-6 py-3 w-[80%] xl:w-1/3 lg:w-1/3 md:w-1/2 h-max mt-8 mx-auto border-solid border border-gray-200 rounded-md">
            <p className="text-black text-base font-medium">Đổi mật khẩu</p>

            <div className="mt-4 w-full">
                <div className="flex flex-row">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Mật khẩu cũ</label>
                </div>
                <input
                    type="password"
                    id="old_pass"
                    className="bg-white border border-gray-300 text-black text-sm rounded-md block w-full p-2.5 "
                    placeholder="Mật khẩu cũ"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            <div className="mt-4 w-full">
                <div className="flex flex-row">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Mật khẩu mới</label>
                </div>
                <input
                    type="password"
                    id="new_pass"
                    className="bg-white border border-gray-300 text-black text-sm rounded-md block w-full p-2.5 "
                    placeholder="Mật khẩu mới"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="mt-4 mb-2 w-full">
                <div className="flex flex-row">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Nhập lại mật khẩu</label>
                </div>
                <input
                    type="password"
                    id="new_pass_again"
                    className="bg-white border border-gray-300 text-black text-sm rounded-md block w-full p-2.5 "
                    placeholder="Nhập lại mật khẩu"
                    required
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                />
            </div>

            <button
                className="w-full md:w-36 xl:w-36 h-10 mt-4 self-end rounded-md bg-blue-500 hover:bg-blue-700"
                title="Cập nhật thay đổi"
                onClick={() => {

                }}
            >
                <p className="text-white text-sm">Cập nhật</p>
            </button>
        </div>
    )
}

export default ChangePassword