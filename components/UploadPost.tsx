import type { NextPage } from "next"
import { useState, useEffect } from "react"
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import MoneyFormat from "../util/MoneyFormat"
import {
    getProvinceName,
    getDistrictName,
    getDistrictPrefix,
    getDistrictId,
    getStreetId,
    getStreetName,
    getWardId,
    getWardName,
    getWardPrefix
} from "../util/Address"
import { Province } from "../interfaces/Province"

type Props = {
    post_type: string;
    provinces: Province[]
}

const UploadPost = (props: Props) => {
    const [postTypes, setPostTypes] = useState(new Array())
    const [estateTypes, setEstateTypes] = useState(new Array())
    const [districts, setDistricts] = useState(new Array())
    const [wards, setWards] = useState(new Array())
    const [streets, setStreets] = useState(new Array())
    const [priceUnits, setPriceUnits] = useState(new Array())

    const [purpose, setPurpose] = useState('sell');
    const [category, setCategory] = useState('');
    const [displayAddress, setDisplayAdress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [quarter, setQuarter] = useState('');
    const [street, setStreet] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [areaSqr, setAreaSqr] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceUnit, setPriceUnit] = useState('');
    const [document, setDocument] = useState('');
    const [isElseOptDoc, setIsElseOptDoc] = useState(false);
    const [floor, setFloor] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [width, setWidth] = useState(0);
    const [depth, setDepth] = useState(0);
    const [roadWidth, setRoadWidth] = useState(0);
    const [direction, setDirection] = useState('');
    const [furniture, setFuniture] = useState('');
    const [images, setImages] = useState(new Array());

    const [postTypeIndex, setPostTypeIndex] = useState(0);
    const [postDuration, setPostDuration] = useState(0);
    const [postType, setPostType] = useState('');
    const [startDate, setStartDate] = useState('');

    const [backdrop, setBackDrop] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [files, setFiles] = useState('');
    const [checkFieldsAlert, setCheckFieldsAlert] = useState(false);

    const purposes = [
        "BÁN", 
        "CHO THUÊ"
    ];

    const documents = [
        "Sổ đỏ/ Sổ hồng", 
        "Hợp đồng mua bán",
        "Đang chờ sổ",
    ];

    const furnitures = [
        "Đầy đủ", 
        "Không có",
    ];

    const post_durations = [
        "7",
        "10",
        "14",
        "21",
    ];

    const fetchDistrict = async (provinceId: string | undefined) => {
        if (provinceId !== undefined) {
          fetch(`https://vn-real-estate-api.herokuapp.com/api/a/district/get?p=${provinceId}`)
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
            fetch(`https://vn-real-estate-api.herokuapp.com/api/a/ward/get?d=${districtId}`)
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
            fetch(`https://vn-real-estate-api.herokuapp.com/api/a/street/get?d=${districtId}`)
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

    const preventCharInput = (e: any) => {
        var regex = new RegExp("[0-9\b]+");
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);
        if (!regex.test(charStr)) {
            e.preventDefault();
        }
    }

    const handlePostTypeIndex = (e: any) => {
        let index = 0;
        postTypes.forEach((element, currentIndex) => {
            if (element._id == e.target.value) {
                index = currentIndex;
            }
        });

        setPostTypeIndex(index)
    }

    const handleImageSelected = (e: any) => {
        let photoUriArr = new Array();
        let files = e.target.files;
        for (let i: number = 0; i < files.length; i++) {
            photoUriArr.push(URL.createObjectURL(files[i]))
        }
        console.log(e.target.files)
        setImages(photoUriArr);

        setFiles(files)
    }

    const updateDisplayImages = (index: number) => {
        let photoUriArr = new Array();
        for (let i: number = 0; i < images.length; i++) {
            if (images[i] != images[index]) {
                photoUriArr.push(images[i])
            }
        }
        setImages(photoUriArr);
    }

    const handleCreatePost = async () => {
        if (checkSubmitFields()) {
            setBackDrop(true)
            // Uploading images to server
            var base64Arr = new Array()
            for (let index = 0; index < files.length; index++) {
                const img = await toBase64(files[index])
                base64Arr.push(img)
            }

            const imgResponse = await fetch('https://vn-real-estate-api.herokuapp.com/api/image-upload/multiple', {
                method: 'POST',
                body: JSON.stringify({
                    "files": base64Arr
                }), // string or object
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const urlArr = await imgResponse.json(); //extract JSON from the http response

            // Creating post
            const response = await fetch('https://vn-real-estate-api.herokuapp.com/api/post/upload', {
                method: 'POST',
                body: JSON.stringify({
                    "title": title,
                    "address": displayAddress,
                    "ownerId": "6263a81788bcf34dbe3030cd",
                    "postTypeId": postType,
                    "estateTypeId": category,
                    "forSaleOrRent": purpose == "BÁN" ? "sale" : "rent",
                    "location": {
                        "CityCode": city,
                        "CityName": getProvinceName(city, props.provinces),
                        "DistrictId": getDistrictId(district, districts),
                        "DistrictName": getDistrictName(district, districts),
                        "DistrictPrefix": getDistrictPrefix(district, districts),
                        "Label": displayAddress,
                        "ShortName": "?",
                        "StreetId": getStreetId(street, streets),
                        "StreetName": getStreetName(street, streets),
                        "StreetPrefix": "Đường",
                        "TextSearch": displayAddress,
                        "WardId": getWardId(quarter, wards),
                        "WardName": getWardName(quarter, wards),
                        "WardPrefix": getWardPrefix(quarter, wards)
                    },
                    "cor": {
                        "lat": 0,
                        "Lng": 0
                    },
                    "belongToProject": {
                        "projectId": 0,
                        "projectName": "SMART"
                    },
                    "description": description,
                    "images": urlArr.data,
                    "legalDocuments": document,
                    "publishedDate": "13/05/2022",
                    "expiredDate": "23/05/2022",
                    "price": price,
                    "priceType": priceUnit,
                    "area": areaSqr,
                    "floorNumber": floor,
                    "bathroomNumber": bathrooms,
                    "bedroomNumber": bedrooms,
                    "direction": direction,
                    "furniture": furniture,
                    "width": width,
                    "depth": depth,
                    "roadWidth": roadWidth,
                    "facade": 0,
                    "status": "waiting",
                }), // string or object
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const myJson = await response.json();
            console.log("Create post result: " + myJson.token)
            setBackDrop(false)
            setShowAlert(true)
        } else {
            setCheckFieldsAlert(true)
        }
    }

    const toBase64 = (obj: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(obj);
        reader.onload = () => resolve(reader.result?.toString());
        reader.onerror = error => reject(error);
    });

    const checkSubmitFields = () => {
        if (postType == '' || purpose == '' || category == '' ||displayAddress == '' || city == ''
            || district == '' || quarter == '' || street == '' || title =='' || description == ''
            || areaSqr == 0 || price == 0 || priceUnit == '' || document == '' || images.length < 1) {
                return false
            }
        return true
    }

    useEffect(() => {
        const fetchEstateTypes = async () => {
            console.log("Getting estate types from Server...")
            const res = await fetch(`https://vn-real-estate-api.herokuapp.com/api/a/estate-type/get`)
            let data = await res.json()
            
            data = data.data
            let types = new Array()

            data.forEach((type: any) => {
                let obj = {
                    _id: type._id,
                    name: type.name,
                }
                types.push(obj)
            })
            
            setEstateTypes(types)
        }

        const fetchPostTypes = async () => {
            console.log("Getting post types from Server...")
            const res = await fetch(`https://vn-real-estate-api.herokuapp.com/api/a/post-type/get`)
            let data = await res.json()
            
            data = data.data
            let types = new Array()

            data.forEach((type: any) => {
                let obj = {
                    _id: type._id,
                    name: type.name,
                    price: type.price,
                }
                types.push(obj)
            })
            
            setPostTypes(types)
        }

        const fetchPriceUnits = async () => {
            console.log("Getting price units from Server...")
            const res = await fetch(`https://vn-real-estate-api.herokuapp.com/api/a/price-unit/get`)
            let data = await res.json()
            
            data = data.data
            let units = new Array()

            data.forEach((unit: any) => {
                let obj = {
                    _id: unit._id,
                    label: unit.label,
                }
                units.push(obj)
            })
            
            setPriceUnits(units)
        }

        fetchEstateTypes()
        fetchPostTypes()
        fetchPriceUnits()
    }, [])

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
                                            <input
                                                id="type-option-1"
                                                type="radio" name="types" value="sell"
                                                className="w-5 h-5 border-gray-300"
                                                aria-labelledby="country-option-1"
                                                aria-describedby="country-option-1"
                                                onClick={() => setPurpose(purposes[0])}
                                            />
                                            <label htmlFor="type-option-1" className="block ml-2 text-sm text-black">
                                                {purposes[0].toUpperCase()}
                                            </label>
                                        </div>

                                        <div className="flex items-center mb-4 ml-12">
                                            <input
                                                id="type-option-2"
                                                type="radio" name="types" value="rent"
                                                className="w-5 h-5 border-gray-300"
                                                aria-labelledby="country-option-2"
                                                aria-describedby="country-option-2"
                                                onClick={() => setPurpose(purposes[1])}
                                            />
                                            <label htmlFor="type-option-2" className="block ml-2 text-sm text-black">
                                                {purposes[1].toUpperCase()}
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="mt-2 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="categories" className="block mb-2 text-sm font-medium text-black">Loại bất động sản</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>

                                    <FormControl fullWidth>
                                        <Select
                                            displayEmpty
                                            value={category}
                                            style={{height: 38, fontSize: 14}}
                                            className="text-sm"
                                            onChange={(e) => {
                                                setCategory(e.target.value)
                                            }}
                                        >
                                            {
                                                estateTypes.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={item._id}
                                                            style={{fontSize: 14}}
                                                        >
                                                            {item.name}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="mt-2 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Địa chỉ</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input type="text" className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-cyan-700" placeholder="Địa chỉ hiển thị" required onChange={(e) => setDisplayAdress(e.target.value)}/>
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
                                                    props.provinces.map((item, index) => {
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
                                                    console.log("Select district: " + getDistrictPrefix(e.target.value, districts))
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
                                    <textarea
                                        name="title"
                                        id="title"
                                        cols={1} rows={2}
                                        className="bg-white h-16 border border-gray-300 text-black text-sm rounded block w-full p-2.5 resize-none hover:border-black focus:border-blue-700"
                                        placeholder="Tiêu đề hiển thị"
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    <p className="text-xs mt-2">Tối thiểu 40 ký tự, tối đa 99 ký tự</p>
                                </div>

                                <div className="mt-4 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Mô tả</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <textarea
                                        name="title"
                                        id="title"
                                        cols={1} rows={2}
                                        className="bg-white h-44 border border-gray-300 text-black text-sm rounded block w-full p-2.5 resize-none hover:border-black focus:border-blue-700"
                                        placeholder="Nhập mô tả về bất động sản của bạn"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
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
                                    <input
                                        type="text"
                                        id="areaSqr"
                                        className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                        placeholder="Diện tích (m²)"
                                        required
                                        value={(isNaN(areaSqr) || areaSqr==0) ? "" : areaSqr.toString()}
                                        onKeyDown={(e) => preventCharInput(e)}
                                        onChange={(e) => setAreaSqr(parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="mt-4 mb-2 w-full flex flex-row justify-between">
                                    <div className="w-3/5">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Mức giá</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <input
                                            type="text"
                                            id="price"
                                            className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                            placeholder="Mức giá"
                                            required
                                            value={(isNaN(price) || price==0) ? "" : price.toString()}
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => setPrice(parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="w-2/6">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Đơn vị</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                value={priceUnit}
                                                style={{height: 38, fontSize: 14}}
                                                onChange={(e) => setPriceUnit(e.target.value)}
                                            >
                                                {
                                                    priceUnits.map((item, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={item._id}
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

                                {/* Giấy tờ pháp lý */}
                                <div className="mt-4 mb-2 w-full flex flex-col">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Giấy tờ pháp lý</label>

                                    <fieldset className="flex flex-row flex-wrap justify-between">
                                        <legend className="sr-only">Docs</legend>
                                        {
                                            documents.map((item, index) => {
                                                return (
                                                    <div className="flex items-center mb-4" key={item}>
                                                        <input type="radio" name="docs" value={item} className="w-5 h-5 border-gray-300" aria-labelledby="docs-option-1" aria-describedby="docs-option-1" onChange={(e) => setDocument(e.target.value)}/>
                                                        <label htmlFor="doc-option-1" className="block ml-2 text-sm text-black">
                                                            {item}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="flex items-center mb-4">
                                            <input id="doc-option-4" type="radio" name="docs" value="Khác" className="w-5 h-5 border-gray-300" aria-labelledby="docs-option-4" aria-describedby="docs-option-4" onClick={() => setIsElseOptDoc(true)}/>
                                            <label htmlFor="doc-option-4" className="block ml-2 text-sm text-black">
                                            Khác
                                            </label>
                                            <input
                                                type="text"
                                                id="doc_else"
                                                className="bg-white ml-3 border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                                placeholder="Nhập"
                                                onChange={(e) => {
                                                    isElseOptDoc ? setDocument(e.target.value) : null
                                                }}
                                            />
                                        </div>
                                    </fieldset>
                                </div>

                                <hr/>

                                {/* Số tầng, blah blah,... */}
                                <div className="mt-2 mb-1 w-full flex flex-row flex-wrap justify-between">
                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số tầng</label>
                                        <input
                                            type="text" 
                                            id="floors"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                            placeholder="0"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setFloor(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Chiều rộng</label>
                                        <input
                                            type="text"
                                            id="width"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                            placeholder="(m)"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setWidth(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số phòng ngủ</label>
                                        <input
                                            type="text"
                                            id="bedrooms"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                            placeholder="0"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setBedrooms(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Chiều sâu</label>
                                        <input
                                            type="text"
                                            id="depth"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                            placeholder="(m)"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setDepth(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số phòng tắm</label>
                                        <input
                                            type="text"
                                            id="bathrooms"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                            placeholder="0"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setBathrooms(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Đường rộng</label>
                                        <input
                                            type="text"
                                            id="entrance-width"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                                            placeholder="(m)"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setRoadWidth(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Hướng nhà</label>
                                        <FormControl>
                                            <Select
                                                displayEmpty
                                                value={direction}
                                                style={{height: 38, fontSize: 14}}
                                                onChange={(e) => setDirection(e.target.value)}
                                            >
                                                <MenuItem key={'Đông'} value={'Đông'} style={{fontSize: 14}}>Đông</MenuItem>
                                                <MenuItem key={'Tây'} value={'Tây'} style={{fontSize: 14}}>Tây</MenuItem>
                                                <MenuItem key={'Nam'} value={'Nam'} style={{fontSize: 14}}>Nam</MenuItem>
                                                <MenuItem key={'Bắc'} value={'Bắc'} style={{fontSize: 14}}>Bắc</MenuItem>
                                                <MenuItem key={'Tây Bắc'} value={'Tây Bắc'} style={{fontSize: 14}}>Tây Bắc</MenuItem>
                                                <MenuItem key={'Đông Bắc'} value={'Đông Bắc'} style={{fontSize: 14}}>Đông Bắc</MenuItem>
                                                <MenuItem key={'Đông Nam'} value={'Đông Nam'} style={{fontSize: 14}}>Đông Nam</MenuItem>
                                                <MenuItem key={'Tây Nam'} value={'Tây Nam'} style={{fontSize: 14}}>Tây Nam</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Nội thất</label>

                                        <FormControl>
                                            <Select
                                                displayEmpty
                                                value={furniture}
                                                style={{height: 38, fontSize: 14}}
                                                onChange={(e) => setFuniture(e.target.value)}
                                            >
                                                {
                                                    furnitures.map((item, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={item}
                                                                style={{fontSize: 14}}
                                                            >
                                                                {item}
                                                            </MenuItem>
                                                            )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            {/* Upload ảnh */}
                            <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Hình ảnh</h1>
                                
                                <div className="mt-2 w-1/3 self-center">
                                    <label htmlFor="file-upload" className="block px-9 lg:px-10 py-2 h-10 text-sm font-medium text-black bg-white rounded border border-gray-300 cursor-pointer hover:border-blue-700 hover:border-2">Chọn ảnh</label>
                                    <input className="hidden" aria-describedby="file-upload" id="file-upload" type="file" accept="image/*" multiple onChange={(e) => handleImageSelected(e)}/>
                                </div>

                                {
                                    images.length > 0 ?
                                    <div className="mt-3 w-full flex flex-row flex-wrap items-center justify-between">
                                        {
                                            images.map((item, index) => {
                                                return (
                                                    <div className="w-[30%] mt-1 mb-1 relative hover:cursor-pointer" key={index}>
                                                        <img src={item} className="rounded-lg hover:opacity-90" alt="Ảnh đã chọn"/>

                                                        <button
                                                            onClick={() => updateDisplayImages(index)}
                                                            className="group absolute top-1 right-1 bg-white w-6 h-6 rounded-full hover:bg-blue-500"
                                                        >
                                                            <span className="text-sm material-icons-outlined text-gray-600 group-hover:text-white">close</span>
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    : null
                                }
                            </div>
                        </div>

                        {/* Loại bài đăng */}
                        <div className="post-type w-full mt-8 lg:mt-0 lg:w-1/4 lg:ml-4 h-max flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
                            <div className="mt-2 mb-2">
                                <div className="flex flex-row">
                                    <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Loại tin đăng</label>
                                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                </div>
                                
                                <FormControl style={{width: '50%'}}>
                                    <Select
                                        displayEmpty
                                        value={postType}
                                        className="text-sm"
                                        style={{height: 38, fontSize: 14}}
                                        onChange={(e) => {
                                            handlePostTypeIndex(e)
                                            setPostType(e.target.value)
                                        }}
                                    >
                                        {
                                            postTypes.map((item, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        value={item._id}
                                                        style={{fontSize: 14}}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="flex flex-row justify-between">
                                <div className="mt-2 mb-2 w-2/5">
                                    <div className="flex flex-row">
                                        <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Số ngày đăng</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>

                                    <FormControl fullWidth>
                                        <Select
                                            displayEmpty
                                            value={postDuration.toString()}
                                            style={{height: 38, fontSize: 14}}
                                            onChange={(e) => setPostDuration(parseInt(e.target.value))}
                                        >
                                            {
                                                post_durations.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                            style={{fontSize: 14}}
                                                        >
                                                            {item} ngày
                                                        </MenuItem>
                                                        )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="mt-2 mb-2" style={{width: '54%'}}>
                                    <div className="flex flex-row">
                                        <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Ngày bắt đầu</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input type="date" className="bg-white px-1 pl-2 h-10 border border-gray-300 text-black sm:text-sm rounded hover:border-black focus:border-blue-700" placeholder="Select date" style={{width: '98%'}}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-200 w-full h-40 py-1 px-3 mt-4 rounded-lg">
                                <div className="flex flex-row justify-between mt-2 mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Loại tin đăng</p>
                                    <p className="text-black text-sm">{postTypes.length > 0 ? postTypes[postTypeIndex].name : ''}</p>
                                </div>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Đơn giá / ngày</p>
                                    <p className="text-black text-sm">{postTypes.length > 0 ? MoneyFormat(postTypes[postTypeIndex].price) : ''} VNĐ</p>
                                </div>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Số ngày đăng</p>
                                    <p className="text-black text-sm">{postDuration==0 ? post_durations[0] : postDuration}</p>
                                </div>

                                <hr className="border-1 border-solid border-black"/>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-lg font-medium">Bạn trả</p>
                                    <p className="text-black text-lg font-medium">
                                        {
                                            postTypes.length > 0 ?
                                            MoneyFormat(
                                                (postDuration==0 && postTypeIndex==0) ?
                                                postTypes[postTypeIndex].price * parseInt(post_durations[0])
                                                : postDuration * postTypes[postTypeIndex].price
                                            ) : ''
                                        } VNĐ
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload button */}
                    {
                        !showAlert ?
                        <div className="w-full text-center">
                            <button
                                className="bg-blue-700 w-full lg:w-1/12 mx-auto px-2 py-2 mt-6 rounded-md text-center cursor-pointer hover:bg-blue-800"
                                onClick={() => handleCreatePost()}
                            >
                                <p className="text-white text-center">Đăng tin {'>'}</p>
                            </button>
                        </div>
                        :
                        <div className="w-full lg:w-1/2 mx-auto mt-6">
                            <Alert severity="success" onClose={() => {setShowAlert(false)}}>
                                <AlertTitle>Thành công</AlertTitle>
                                Tin đăng của bạn đã được ghi nhận — <strong>Vui lòng chờ kiểm duyệt của QTV!</strong>
                            </Alert>
                        </div>
                    }


                    {/* /* Check all fields alert */}
                    {
                        checkFieldsAlert ?
                        <div className="w-full lg:w-1/2 mx-auto mt-6">
                            <Alert severity="error" onClose={() => {setCheckFieldsAlert(false)}}>
                                <AlertTitle>Thất bại</AlertTitle>
                                Kiểm tra lại tất cả thông tin — <strong>Vui lòng thử lại!</strong>
                            </Alert>
                        </div>
                        : null
                    }
                </div>
            </div>
            
            <Backdrop
                className="flex flex-col"
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
                <p className="mt-4 text-base text-white">Đang thực hiện. Bạn vui lòng chờ chút nhé!</p>
            </Backdrop>
        </>
    )
}

export default UploadPost