import type { NextPage } from "next"
import { useState, useEffect } from "react"
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import server from "../../../interfaces/server"

const EditInformation = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [quarter, setQuarter] = useState('');
    const [street, setStreet] = useState('');

    const [provinces, setProvinces] = useState(new Array())
    const [districts, setDistricts] = useState(new Array())
    const [wards, setWards] = useState(new Array())
    const [streets, setStreets] = useState(new Array())

    const preventCharInput = (e: any) => {
        var regex = new RegExp("[0-9\b]+");
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);
        if (!regex.test(charStr)) {
            e.preventDefault();
        }
    }

    const fetchDistrict = async (provinceId: string | undefined) => {
        if (provinceId !== undefined) {
          fetch(`${server}/a/district/get?p=${provinceId}`)
            .then((res) => res.json())
            .then((data) => {
              let ds = new Array()
              data.data.forEach((district: any) => {
                let d = {
                  label: district.districtName,
                  value: district.districtCode,
                  _id: district._id,
                  prefix: district.prefix
                }
                ds.push(d)
                })
              setDistricts(ds)
            })
        }
    }
    
    const fetchWard = async (districtId: string | undefined) => {
        if (districtId !== undefined) {
            fetch(`${server}/a/ward/get?d=${districtId}`)
            .then((res) => res.json())
            .then((data) => {
                let ws = new Array()
                data.data.forEach((ward: any) => {
                    let w = {
                        label: ward.wardName,
                        value: ward.wardCode,
                        _id: ward._id,
                        prefix: ward.prefix
                    }
                    ws.push(w)
                })
                setWards(ws)
            })
        }
    }
    
    const fetchStreet = async (districtId: string | undefined) => {
        if (districtId !== undefined) {
            fetch(`${server}/a/street/get?d=${districtId}`)
            .then((res) => res.json())
            .then((data) => {
                let ss = new Array()
                data.data.forEach((street: any) => {
                    let s = {
                        label: street.streetName,
                        value: street.streetCode,
                        _id: street._id,
                    }
                    ss.push(s)
                })
                setStreets(ss)
            })
        }
    }

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await fetch(`${server}/a/province/get`)
            let data = await res.json()
            data = data.data
            let provinces = new Array()
            data.forEach((province: any) => {
                let obj = {
                value: province._id,
                label: province.provinceName,
                }

                provinces.push(obj)
            })
            setProvinces(provinces)
        }

        const getUserInformation = async () => {
            await
            fetch(`${server}/user/currentUser`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setFullname(data.user.username)
                setEmail(data.user.email)
                setPhone(data.user.phone)
                setDateOfBirth(data.user.dateOfBirth)
            })
        }

        getUserInformation()
        fetchProvinces()
    }, [])

    return (
        <div className="flex flex-col px-6 py-3 w-[80%] xl:w-1/3 lg:w-1/3 md:w-1/2 h-max mt-8 mx-auto border-solid border border-gray-200 rounded-lg">
            <p className="text-black text-base font-medium">Thông tin tài khoản</p>

            <div className="mt-4 w-full">
                <div className="flex flex-row">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Họ và tên</label>
                </div>
                <input
                    type="text"
                    className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-cyan-700"
                    placeholder="Họ và tên"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>

            <div className="mt-4 w-full">
                <div className="flex flex-row">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                </div>
                <input
                    type="email"
                    className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-cyan-700"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mt-4 mb-2 w-full">
                <div className="flex flex-row">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Ngày sinh</label>
                </div>
                <input type="date" className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-cyan-700" placeholder="Select date" style={{width: '98%'}}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    value={"2012-01-08"}
                />
            </div>

            <div className="mt-4 mb-3 w-full">
                <div className="flex flex-row">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">Số điện thoại</label>
                </div>
                <input
                    type="tel"
                    className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-cyan-700"
                    placeholder="Số điện thoại"
                    required
                    value={phone}
                    onKeyDown={(e) => preventCharInput(e)}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className="flex flex-row flex-wrap items-center justify-between">
                <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Tỉnh, thành phố</label>
                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>

                    <FormControl fullWidth>
                        <Select
                            displayEmpty
                            value={city}
                            style={{height: 38, fontSize: 14}}
                            className="text-sm"
                            onChange={(e) => {
                                console.log(e.target.value)
                                setCity(e.target.value)
                                fetchDistrict(e.target.value)
                            }}
                        >
                            {
                                provinces.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={item.value}
                                            value={item.value}
                                            style={{fontSize: 14}}
                                        >
                                            {item.label}
                                        </MenuItem>
                                        )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Quận, huyện</label>
                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>

                    <FormControl fullWidth>
                        <Select
                            displayEmpty
                            value={district}
                            style={{height: 38, fontSize: 14}}
                            onChange={(e) => {
                                setDistrict(e.target.value)
                                fetchWard(e.target.value)
                                fetchStreet(e.target.value)
                            }}
                        >
                            {
                                districts.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={item.value}
                                            style={{fontSize: 14}}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Phường, xã</label>
                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>
                    <FormControl fullWidth>
                        <Select
                            displayEmpty
                            value={quarter}
                            style={{height: 38, fontSize: 14}}
                            onChange={(e) => setQuarter(e.target.value)}
                        >
                            {
                                wards.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={item.value}
                                            value={item.value}
                                            style={{fontSize: 14}}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Đường, phố</label>
                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>  
                    <FormControl fullWidth>
                        <Select
                            displayEmpty
                            value={street}
                            style={{height: 38, fontSize: 14}}
                            onChange={(e) => setStreet(e.target.value)}
                        >
                            {
                                streets.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={item.value}
                                            value={item.value}
                                            style={{fontSize: 14}}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>

            <button
                className="w-full md:w-36 xl:w-36 h-10 mt-2 self-end rounded-md bg-blue-500 hover:bg-blue-700"
                title="Cập nhật thay đổi"
                onClick={() => {

                }}
            >
                <p className="text-white text-sm">Cập nhật</p>
            </button>
        </div>
    )
}

export default EditInformation