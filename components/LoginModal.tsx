import React from "react"
import Image from "next/image"
import server from "../interfaces/server"
interface ModalProps {
  showModal: boolean
  callback: any
}

export default function Login(props: ModalProps) {
  // const [showModal, setShowModal] = React.useState()
  const [showPassword, setShowPassword] = React.useState(false)
  const [usernameEmail, setUsernameEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const isShowPassword = () => {
    setShowPassword((val) => !val)
    if (showPassword == true) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-Width="2"
        >
          <path
            stroke-Linecap="round"
            stroke-Linejoin="round"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      )
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-Width="2"
      >
        <path
          stroke-Linecap="round"
          stroke-Linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-Linecap="round"
          stroke-Linejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    )
  }

  const login = () => {
    console.log("login")
    fetch(`${server}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        username: usernameEmail,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.userDto)
        if (data.userDto) {
          sessionStorage.setItem("jwt", data.userDto.token)
          sessionStorage.setItem("id", data.userDto._id)
          // sessionStorage.setItem("fullname", data.userDto.fullname)

          window.location.reload()
        }
      })
  }

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[26rem] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="w-full text-center text-2xl font-semibold ">
                    Đăng nhập
                  </h3>
                  <button
                    className="absolute right-4"
                    onClick={() => props.callback("close")}
                  >
                    <span className="material-icons-outlined">close</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <div className="space-y-4">
                    <div className="relative flex w-full flex-wrap items-stretch md-3">
                      <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-Width="2"
                        >
                          <path
                            stroke-Linecap="round"
                            stroke-Linejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <input
                        className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none w-full pl-10 hover:border-black focus:border-cyan-700"
                        type="text"
                        placeholder="Tên đăng nhập/Email"
                        value={usernameEmail}
                        onChange={(event) => {
                          setUsernameEmail(event.target.value)
                        }}
                      ></input>
                    </div>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-Width="2"
                      >
                        <path
                          stroke-Linecap="round"
                          stroke-Linejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white rounded text-sm border border-inherit outline-none focus:outline-none w-full pl-10 hover:border-black focus:border-cyan-700"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value)
                      }}
                    ></input>
                    <span
                      onClick={isShowPassword}
                      className="z-10 h-6 w-6 leading-snug font-normal absolute text-center text-slate-600 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-16 py-3 cursor-pointer"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-Width="2"
                        >
                          <path
                            stroke-Linecap="round"
                            stroke-Linejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-Width="2"
                        >
                          <path
                            stroke-Linecap="round"
                            stroke-Linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-Linecap="round"
                            stroke-Linejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </span>
                    <button
                      className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-700 text-white"
                      onClick={() => {
                        login()
                      }}
                    >
                      Đăng nhập
                    </button>
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <input className="w-4 h-4 mt-1" type="checkbox"></input>
                        <p>Nhớ tài khoản</p>
                      </div>
                      <a href="#" className="text-red-500">
                        Quên mật khẩu?
                      </a>
                    </div>
                    {/* <p className="text-center">Hoặc</p> */}
                  </div>
                </div>
                {/*footer*/}
                {/* <div className="w-full flex justify-center p-6 space-x-2">
                  <div className="w-auto relative">
                    <button className="flex w-full rounded h-14 border border-inherit">
                      <span className="pt-2 w-12 h-12 leading-snug font-normal absolute bg-transparent rounded text-base w-8 pl-3">
                        <Image
                          src="/834722_facebook_icon.svg"
                          width="100"
                          height="100"
                        />
                      </span>
                      <p className="self-center pl-16 pr-10">FaceBook</p>
                    </button>
                  </div>
                  <div className="w-auto relative">
                    <button className="flex w-full rounded h-14 border border-inherit">
                      <span className="pt-2 w-12 h-12 leading-snug font-normal absolute bg-transparent rounded text-base w-8 pl-3">
                        <Image
                          src="/2993685_brand_brands_google_logo_logos_icon.svg"
                          width="100"
                          height="100"
                        />
                      </span>
                      <p className="self-center pl-16 pr-10">Google</p>
                    </button>
                  </div>
                </div> */}
                <p className="p-6 text-center">
                  Chưa là thành viên?{" "}
                  <span
                    onClick={() => {
                      props.callback("register")
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    Đăng ký
                  </span>{" "}
                  tại đây
                </p>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
