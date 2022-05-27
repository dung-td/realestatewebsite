import { useState } from "react"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import server from "../../../interfaces/server"

const ChangePassword = () => {
    const [fail, setFail] = useState(false)
    const [success, setSuccess] = useState(false)
    const [alertWrongPass, setAlertWrongPass] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    const handleUpdateButton = async () => {
        if (newPassword == passwordAgain) {
            const response = await fetch(`${server}/user/changePassword`, {
                method: "POST",
                body: JSON.stringify({
                    "oldPassword": oldPassword,
                    "newPassword": newPassword,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
                },
            })
        
            const myJson = await response.json()
            
            if (myJson.message && response.status==200) {
                setSuccess(true)
            } else {
                setFail(true)
            }
        } else {
            setAlertWrongPass(true)
        }
    }

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
                    onChange={(e) => {
                        setAlertWrongPass(false)
                        setNewPassword(e.target.value)
                    }}
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
                    onChange={(e) => {
                        setAlertWrongPass(false)
                        setPasswordAgain(e.target.value)
                    }}
                />
            </div>

            {
                (!fail && !success && !alertWrongPass) ?
                <button
                    className="w-full md:w-36 xl:w-36 h-10 mt-4 self-end rounded-md bg-blue-500 hover:bg-blue-700"
                    title="Cập nhật thay đổi"
                    onClick={() => {
                        handleUpdateButton()
                    }}
                >
                    <p className="text-white text-sm">Cập nhật</p>
                </button>
                : null
            }
            
            {
                alertWrongPass ?
                <div className="w-full mx-auto mt-4">
                    <Alert
                        severity="error"
                        onClose={() => {
                            setAlertWrongPass(false)
                        }}
                    >
                    <AlertTitle>Thất bại</AlertTitle>
                        Mật khẩu mới và mật khẩu nhập lại khác nhau — {" "} <strong>Vui lòng kiểm tra lại!</strong>
                    </Alert>
                </div>
                : null
            }

            {
                success ?
                <div className="w-full mx-auto mt-4">
                    <Alert
                        severity="success"
                        onClose={() => {
                            setSuccess(false)
                        }}
                    >
                    <AlertTitle>Thành công</AlertTitle>
                        Mật khẩu mới đã được cập nhật!
                    </Alert>
                </div>
                : null
            }

            {
                fail ?
                <div className="w-full mx-auto mt-4">
                    <Alert
                        severity="error"
                        onClose={() => {
                            setFail(false)
                        }}
                    >
                    <AlertTitle>Thất bại</AlertTitle>
                        Không thể cập nhật mật khẩu!— {" "} <strong>Vui lòng kiểm tra lại!</strong>
                    </Alert>
                </div>
                : null
            }
        </div>
    )
}

export default ChangePassword