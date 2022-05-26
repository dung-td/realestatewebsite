import type { GetServerSideProps, NextPage } from "next"
import { useState, useEffect } from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Backdrop from "@mui/material/Backdrop"
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"
import CircularProgress from "@mui/material/CircularProgress"
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from '@mui/icons-material/Send'
import server from "../../interfaces/server"
import Map from "../../components/Map"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import MoneyFormat from "../../util/MoneyFormat"
import {
  getProvinceName,
  getDistrictName,
  getDistrictPrefix,
  getDistrictId,
  getStreetId,
  getStreetName,
  getWardId,
  getWardName,
  getWardPrefix,
} from "../../util/Address"
import { Province } from "../../interfaces/Province"

type Props = {
  provinces: Province[]
}

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const UploadProject = (props: Props) => {
  const [postTypes, setPostTypes] = useState(new Array())
  const [projectTypes, setProjectTypes] = useState(new Array())
  const [districts, setDistricts] = useState(new Array())
  const [wards, setWards] = useState(new Array())
  const [streets, setStreets] = useState(new Array())

  const [usrId, setUsrId] = useState("")
  const [currentCap, setCurrentCap] = useState("")
  const [currentCapIndex, setCurrentCapIndex] = useState(-1)
  const [category, setCategory] = useState("")
  const [displayAddress, setDisplayAdress] = useState("")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [quarter, setQuarter] = useState("")
  const [street, setStreet] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState(new Array())
  const [constructor, setConstructor] = useState("")
  const [manager, setManager] = useState("")
  const [areaSqr, setAreaSqr] = useState(0)
  const [price, setPrice] = useState(0)
  const [document, setDocument] = useState("")
  const [isElseOptDoc, setIsElseOptDoc] = useState(false)
  const [density, setDensity] = useState(0)
  const [apartments, setApartments] = useState(0)
  const [buildings, setBuildings] = useState(0)
  const [yQuarterStart, setYQuarterStart] = useState("")
  const [yQuarterEnd, setYQuarterEnd] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endYear, setEndYear] = useState("")
  const [prjStatus, setPrjStatus] = useState("")
  const [images, setImages] = useState(new Array())
  const [currentParagraph, setCurrentParagraph] = useState("")
  const [showParagraphInput, setShowParagraphInput] = useState(false)
  const [mapMarker, setMapMarker] = useState([0, 0])
  const [prjUtilities, setPrjUtilities] = useState(new Array())

  const [postTypeIndex, setPostTypeIndex] = useState(0)
  const [postDuration, setPostDuration] = useState(0)
  const [postType, setPostType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [expireDate, setExpireDate] = useState("")
  const [falseDate, setFalseDate] = useState(false)

  const [backdrop, setBackDrop] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [files, setFiles] = useState("")
  const [checkFieldsAlert, setCheckFieldsAlert] = useState(false)

  const documents = ["Sổ đỏ/ Sổ hồng", "Hợp đồng mua bán", "Đang chờ sổ"]

  const status = [
    {
      label: "Đang mở bán",
      val: "open"
    },
    {
      label: "Sắp mở bán",
      val: "pre-open"
    },
    {
      label: "Đã bàn giao",
      val: "finish"
    }
  ]

  const yearQuarters = ["Q1", "Q2", "Q3", "Q4"]

  const years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]

  const post_durations = ["7", "10", "14", "21"]

  const utilities = [
    "Bãi đỗ xe",
    "Sân bóng rổ",
    "Công viên",
    "Sân Tennis",
    "Phòng Gym",
    "Phòng Yoga",
    "HT An ninh",
    "HT Điều hòa",
    "Hệ thống PCCC",
    "Lối thoát hiểm",
    "Hồ bơi",
    "Vui chơi trẻ em",
    "Siêu thị",
    "Cửa hàng tiện lợi",
    "Spa",
    "Coffee",
    "ATM & Ngân hàng",
    "Thang máy"
  ];

  const onMapLngLatCallback = (lng: any, lat: any) => {
    console.log(lng + "/" + lat)
    setMapMarker([lng, lat])
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
              prefix: district.prefix,
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
              prefix: ward.prefix,
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

  const handleAddParagraph = () => {
    if (currentParagraph != "") {
      var arr = description
      var obj = {
        type: "text",
        content: currentParagraph,
        caption: ""
      }
      arr.push(obj)

      setDescription(arr)
      setShowParagraphInput(false)
    }
  }

  const handleAddImageToDescription = (e: any) => {
    var arr = new Array()
    var obj = {
      type: "image",
      content: e.target.files[0],
      caption: ""
    }

    description.forEach((element) => {
      arr.push(element)
    })
    arr.push(obj)

    setDescription(arr)
  }

  const preventCharInput = (e: any) => {
    var regex = new RegExp("[0-9\b]+")
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which
    var charStr = String.fromCharCode(charCode)
    if (!regex.test(charStr)) {
      e.preventDefault()
    }
  }

  const handleDateSelected = (e: any) => {
    const today = new Date()
    const selected = new Date(e.target.value)
    var expire = new Date(e.target.value)
    expire.setDate(selected.getDate() + postDuration)

    if (selected < today) {
        e.preventDefault()
        setFalseDate(true)
    } else {
        setStartDate(
            selected.getDate() + "/" +
            (selected.getMonth() + 1).toString() + "/" +
            selected.getFullYear()
        )
        setExpireDate(
            expire.getDate() + "/" +
            (expire.getMonth() + 1).toString() +
            "/" + expire.getFullYear()
        )
        setFalseDate(false)
    }
  }

  const handlePostTypeIndex = (e: any) => {
    let index = 0
    postTypes.forEach((element, currentIndex) => {
      if (element._id == e.target.value) {
        index = currentIndex
      }
    })

    setPostTypeIndex(index)
  }

  const handleImageSelected = (e: any) => {
    let photoUriArr = new Array()
    let files = e.target.files
    for (let i: number = 0; i < files.length; i++) {
      photoUriArr.push(URL.createObjectURL(files[i]))
    }
    setImages(photoUriArr)

    setFiles(files)
  }

  const updateDisplayImages = (index: number) => {
    let photoUriArr = new Array()
    for (let i: number = 0; i < images.length; i++) {
      if (images[i] != images[index]) {
        photoUriArr.push(images[i])
      }
    }
    setImages(photoUriArr)
  }

  const handleCreatePost = async () => {
    if (checkSubmitFields()) {
      setBackDrop(true)

      // Uploading description images to server
      var uDescription = new Array()
      var dscBase64Arr = new Array()
      for (let index = 0; index < description.length; index++) {
        if (description[index].type == "image") {
          const img = await toBase64(description[index].content)
          dscBase64Arr.push(img)
        }
      }

      const fResponse = await fetch(`${server}/image-upload/multiple`, {
        method: "POST",
        body: JSON.stringify({
          "files": dscBase64Arr,
        }), // string or object
        headers: {
          "Content-Type": "application/json",
        },
      })
      const fUrlArr = await fResponse.json() //extract JSON from the http response

      // Update description array with image url
      var imgIndex = 0
      description.forEach((element) => {
        if (element.type == "image") {
          uDescription.push({
            type: "image",
            content: fUrlArr.data[imgIndex],
            caption: element.caption
          })
          imgIndex++
        } else {
          uDescription.push(element)
        }
      })
      console.log(fUrlArr.data)

      // Uploading images to server
      var base64Arr = new Array()
      for (let index = 0; index < files.length; index++) {
        const img = await toBase64(files[index])
        base64Arr.push(img)
      }

      const imgResponse = await fetch(`${server}/image-upload/multiple`, {
        method: "POST",
        body: JSON.stringify({
          "files": base64Arr,
        }), // string or object
        headers: {
          "Content-Type": "application/json",
        },
      })
      const urlArr = await imgResponse.json() //extract JSON from the http response

      // Creating post
      // const response = await fetch(`${server}/post/upload`, {
      const response = await fetch(`${server}/project/upload`, {
        method: "POST",
        body: JSON.stringify({
          "name": title,
          "address": displayAddress,
          "projectTypeId": category,
          "postTypeId": postType,
          "investorId": usrId,
          "projectStatus": prjStatus,
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
            "WardPrefix": getWardPrefix(quarter, wards),
          },
          "cor": {
            "lat": mapMarker[1],
            "Lng": mapMarker[0],
          },
          "description": uDescription,
          "images": urlArr.data,
          "legalDocuments": document,
          "publishedDate": startDate,
          "expiredDate": expireDate,
          "price": price,
          "area": areaSqr,
          "aparmentNumber": apartments,
          "buildingNumber": buildings,
          "density": density,
          "estimatedStartTime": yQuarterStart + "/" + startYear,
          "estimatedCompletionTime": yQuarterEnd + "/" + endYear,
          "manager": manager,
          "constructor": constructor,
          "utilities": prjUtilities,
          "status": "waiting",
          "declineReasonId": "",
          "slug": "slug"
        }), // string or object
        headers: {
          "Content-Type": "application/json",
        },
      })

      const myJson = await response.json()
      console.log("Create post result: " + myJson.token)

      setBackDrop(false)
      setShowAlert(true)
    } else {
      setCheckFieldsAlert(true)
    }
  }

  const toBase64 = (obj: any) => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(obj)
      reader.onload = () => resolve(reader.result?.toString())
      reader.onerror = (error) => reject(error)
  })

  const checkSubmitFields = () => {
    if (
      postType == "" ||
      category == "" ||
      displayAddress == "" ||
      city == "" ||
      district == "" ||
      quarter == "" ||
      street == "" ||
      title == "" ||
      description.length < 1 ||
      manager == "" ||
      constructor == "" ||
      areaSqr == 0 ||
      price == 0 ||
      document == "" ||
      startYear == ""  || endYear == "" ||
      yQuarterStart == "" || yQuarterEnd == "" ||
      falseDate ||
      images.length < 1
    ) {
      return false
    }
    return true
  }

  useEffect(() => {
    const fetchProjectTypes = async () => {
      console.log("Getting project types from Server...")
      const res = await fetch(`${server}/a/project-type/get`)
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

      setProjectTypes(types)
    }

    const fetchPostTypes = async () => {
      console.log("Getting post types from Server...")
      const res = await fetch(`${server}/a/post-type/get`)
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

    const fetchCurrentUser = async () => {
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
        setUsrId(data.user._id)
        console.log("UserID: " + data.user._id)
      })
    }

    fetchProjectTypes()
    fetchPostTypes()
    fetchCurrentUser()
  }, [])

  return (
    <>
      <Header/>

      {/* Upload post */}
      <div className="bg-white">
        <div
          className="max-w-2xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8"
          style={{ maxWidth: "1200" }}
        >
          <h2 className="font-bold text-xl text-center mb-4">Đăng dự án</h2>

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

                <div className="mt-4 mb-2">
                  <div className="flex flex-row">
                    <label
                      htmlFor="categories"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Loại dự án
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>

                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={category}
                      style={{ height: 38, fontSize: 14 }}
                      className="text-sm"
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
                    >
                      {projectTypes.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item._id}
                            style={{ fontSize: 14 }}
                          >
                            {item.name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className="mt-2 mb-2">
                  <div className="flex flex-row">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Địa chỉ
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <input
                    type="text"
                    className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-cyan-700"
                    placeholder="Địa chỉ hiển thị"
                    required
                    onChange={(e) => setDisplayAdress(e.target.value)}
                  />
                </div>

                <div className="flex flex-row flex-wrap items-center justify-between">
                  <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Tỉnh, thành phố
                      </label>
                      <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>

                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={city}
                        style={{ height: 38, fontSize: 14 }}
                        className="text-sm"
                        onChange={(e) => {
                          console.log(e.target.value)
                          setCity(e.target.value)
                          fetchDistrict(e.target.value)
                        }}
                      >
                        {props.provinces.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.value}
                              value={item.value}
                              style={{ fontSize: 14 }}
                            >
                              {item.label}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Quận, huyện
                      </label>
                      <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>

                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={district}
                        style={{ height: 38, fontSize: 14 }}
                        onChange={(e) => {
                          console.log(
                            "Select district: " +
                              getDistrictPrefix(e.target.value, districts)
                          )
                          setDistrict(e.target.value)
                          fetchWard(e.target.value)
                          fetchStreet(e.target.value)
                        }}
                      >
                        {districts.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item.value}
                              style={{ fontSize: 14 }}
                            >
                              {item.label}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Phường, xã
                      </label>
                      <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>

                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={quarter}
                        style={{ height: 38, fontSize: 14 }}
                        onChange={(e) => setQuarter(e.target.value)}
                      >
                        {wards.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.value}
                              value={item.value}
                              style={{ fontSize: 14 }}
                            >
                              {item.label}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="mt-2 mb-2 w-5/12">
                    <div className="flex flex-row">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Đường, phố
                      </label>
                      <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>

                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={street}
                        style={{ height: 38, fontSize: 14 }}
                        onChange={(e) => setStreet(e.target.value)}
                      >
                        {streets.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.value}
                              value={item.value}
                              style={{ fontSize: 14 }}
                            >
                              {item.label}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                {/* Map and Marker */}
                <div className="mt-4 mb-1">
                  <label className="block mb-2 text-sm font-medium text-black">Đánh dấu trên bản đồ</label>
                  
                  <div className="mt-2">
                    <Map
                      type="edit"
                      lng={106.80309701313547}
                      lat={10.870314445802961}
                      callback={onMapLngLatCallback}
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin giới thiệu */}
              <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                <h1 className="font-bold text-lg">Thông tin giới thiệu</h1>
                <div className="flex flex-row">
                  <p className="text-sm">Thông tin có dấu</p>
                  <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                  <p className="text-sm">là bắt buộc</p>
                </div>

                <div className="mt-4 mb-2">
                  <div className="flex flex-row">
                    <label className="block mb-2 text-sm font-medium text-black">
                      Tên dự án
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <input
                    name="title"
                    id="title"
                    type="text"
                    className="bg-white h-10 border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                    placeholder="Tên dự án"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <p className="text-xs mt-2">
                    Tối thiểu 40 ký tự, tối đa 99 ký tự
                  </p>
                </div>

                <div className="mt-2 mb-2">
                  <div className="flex flex-col lg:flex-row mb-2 lg:items-center justify-between">
                    <div className="flex flex-row">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Thông tin mô tả
                      </label>
                      <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>

                    {/* Clear description stack button */}
                    {
                      description.length > 0 ?
                      <button
                        className="bg-red-700 w-full lg:w-28 px-2 py-2 rounded-md cursor-pointer hover:bg-red-800"
                        onClick={() => setDescription(new Array())}
                      >
                        <div className="flex flex-row items-center justify-center">
                          <p className="text-white text-sm text-center">Xóa mô tả</p>
                          <CancelIcon fontSize="small" style={{color: '#fff'}} className="ml-2"/>
                        </div>
                      </button>
                      : null
                    }
                    
                  </div>
                  
                  {/* DescriptionStack */}
                  <div className="flex flex-col w-full">
                    {
                      description.map((item, index) => {
                        return (
                          item.type == "text" ?
                          <p key={item.content} className="text-sm text-black text-justify whitespace-pre-wrap mt-2 mb-2">{item.content}</p>
                          :
                          <>
                            <img
                                src={URL.createObjectURL(item.content)}
                                key={item.content}
                                className="rounded-lg w-full mt-2 mb-2 hover:opacity-90"
                                alt="Ảnh đã chọn"
                            />
                            <div className="flex flex-row w-full items-center justify-center">
                              <input
                                type="text"
                                placeholder="Caption ảnh"
                                className="border border-gray-300 text-center rounded-md text-sm h-8 w-2/3 self-center hover:border-black focus:border-blue-700"
                                onChange={(e) => {
                                  setCurrentCap(e.target.value)
                                }}
                                onClick={(e) => setCurrentCapIndex(index)}
                              />

                              {
                                currentCapIndex == index ?
                                <button
                                  className="bg-blue-700 w-7 h-7 px-2 py-2 ml-2 rounded-full cursor-pointer hover:bg-blue-800"
                                  onClick={() => {
                                    var arr = new Array()
                                    description.forEach((element, i) => {
                                      if (i == index) {
                                        var obj = {
                                          type: element.type,
                                          content: element.content,
                                          caption: currentCap
                                        }
                                        arr.push(obj)
                                      } else {
                                        arr.push(element)
                                      }
                                    })
                                    setDescription(arr)
                                    setCurrentCapIndex(-1)
                                    console.log(arr)
                                  }}
                                >
                                  <CheckIcon fontSize="small" style={{color: '#fff'}} className="-mt-3 -ml-1"/>
                                </button>
                                : null
                              }
                              
                            </div>
                          </>
                        )
                      })
                    }
                  </div>

                  {
                    showParagraphInput ?
                    <textarea
                        cols={1}
                        rows={2}
                        className="bg-white h-44 mt-2 border border-gray-300 text-black text-sm rounded block w-full p-2.5 resize-none hover:border-black focus:border-blue-700"
                        placeholder="Nhập mô tả dự án"
                        onChange={(e) => setCurrentParagraph(e.target.value)}
                        required
                    />
                    : null
                  }

                  {/* Add and submit button */}
                  {
                    !showParagraphInput ?
                      <div className="flex flex-row mt-4 justify-center">
                        <button
                            className="bg-blue-700 w-full lg:w-36 px-2 py-2 rounded-md text-center cursor-pointer hover:bg-blue-800"
                            onClick={() => {
                              setCurrentParagraph("")
                              setShowParagraphInput(true)
                            }}
                        >
                            <div className="flex flex-row items-center justify-center">
                                <p className="text-white text-sm text-center">Thêm đoạn văn</p>
                                <TextSnippetIcon fontSize="small" style={{color: '#fff'}} className="ml-2"/>
                            </div>
                        </button>

                        <button
                          className="bg-blue-700 ml-4 w-full lg:w-28 px-2 py-2 rounded-md text-center cursor-pointer hover:bg-blue-800"
                          onClick={() => {}}
                        >
                          <div className="flex flex-row items-center justify-center">
                            <label htmlFor="image-description" className="text-white text-sm text-center cursor-pointer">Thêm ảnh</label>
                            <InsertPhotoIcon fontSize="small" style={{color: '#fff'}} className="ml-2"/>
                            <input
                              className="hidden"
                              aria-describedby="image-description"
                              id="image-description"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleAddImageToDescription(e)}
                            />
                          </div>
                        </button>
                      </div>
                    :
                      <div className="w-full text-center">
                        <button
                          className="bg-red-700 w-full lg:w-24 px-2 py-2 mt-4 mr-2 rounded-md cursor-pointer hover:bg-red-800"
                          onClick={() => {setShowParagraphInput(false)}}
                        >
                          <div className="flex flex-row items-center justify-center">
                            <p className="text-white text-sm text-center">Hủy</p>
                            <CancelIcon fontSize="small" style={{color: '#fff'}} className="ml-2"/>
                          </div>
                        </button>

                        <button
                          className="bg-blue-700 w-full lg:w-24 px-2 py-2 mt-4 lg:ml-2 rounded-md cursor-pointer hover:bg-blue-800"
                          onClick={() => handleAddParagraph()}
                        >
                          <div className="flex flex-row items-center justify-center">
                            <p className="text-white text-sm text-center">Thêm</p>
                            <CheckIcon fontSize="small" style={{color: '#fff'}} className="ml-2"/>
                          </div>
                        </button>
                      </div>
                  }
                </div>
              </div>

              {/* Thông tin chi tiết */}
              <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                <h1 className="font-bold text-lg">Thông tin chi tiết</h1>
                <div className="flex flex-row">
                  <p className="text-sm">Thông tin có dấu</p>
                  <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                  <p className="text-sm">là bắt buộc</p>
                </div>

                {/* Trạng thái dự án */}
                <div className="mt-4">
                  <div className="flex flex-row">
                    <label
                      htmlFor="categories"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Trạng thái dự án
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>

                  <FormControl className="w-1/3">
                    <Select
                      displayEmpty
                      value={prjStatus}
                      style={{ height: 38, fontSize: 14 }}
                      className="text-sm"
                      onChange={(e) => {
                        setPrjStatus(e.target.value)
                      }}
                    >
                      {status.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item.val}
                            style={{ fontSize: 14 }}
                          >
                            {item.label}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </div>

                {/* Đơn vị quản lý */}
                <div className="mt-4 mb-2">
                  <div className="flex flex-row">
                    <label className="block mb-2 text-sm font-medium text-black">
                        Đơn vị quản lý
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <input
                    type="text"
                    className="bg-white h-10 border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                    placeholder="Đơn vị quản lý"
                    onChange={(e) => setManager(e.target.value)}
                    required
                  />
                </div>

                {/* Đơn vị thi công */}
                <div className="mt-2 mb-2">
                  <div className="flex flex-row">
                    <label className="block mb-2 text-sm font-medium text-black">
                      Đơn vị thi công
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <input
                    name="title"
                    id="title"
                    type="text"
                    className="bg-white h-10 border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                    placeholder="Đơn vị thi công"
                    onChange={(e) => setConstructor(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-row justify-between">
                    {/* Diện tích */}
                    <div className="mt-4 mb-2 w-1/3">
                        <div className="flex flex-row">
                            <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-black"
                            >
                            Diện tích (m²)
                            </label>
                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                        </div>
                        <input
                            type="text"
                            id="areaSqr"
                            className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                            placeholder="Diện tích (m²)"
                            required
                            value={
                            isNaN(areaSqr) || areaSqr == 0 ? "" : areaSqr.toString()
                            }
                            onKeyDown={(e) => preventCharInput(e)}
                            onChange={(e) => setAreaSqr(parseInt(e.target.value))}
                        />
                    </div>

                    {/* Mức giá */}
                    <div className="mt-4 mb-2 w-1/2">
                        <div className="flex flex-row">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-black"
                            >
                                Mức giá
                            </label>
                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                        </div>
                        <input
                            type="text"
                            id="price"
                            className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                            placeholder="Mức giá (VNĐ / m²)"
                            required
                            value={isNaN(price) || price == 0 ? "" : price.toString()}
                            onKeyDown={(e) => preventCharInput(e)}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                {/* Giấy tờ pháp lý */}
                <div className="mt-4 mb-2 w-full flex flex-col">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Giấy tờ pháp lý
                  </label>

                  <fieldset className="flex flex-row flex-wrap justify-between">
                    <legend className="sr-only">Docs</legend>
                    {documents.map((item, index) => {
                      return (
                        <div className="flex items-center mb-4" key={item}>
                          <input
                            type="radio"
                            name="docs"
                            value={item}
                            className="w-5 h-5 border-gray-300"
                            aria-labelledby="docs-option-1"
                            aria-describedby="docs-option-1"
                            onChange={(e) => setDocument(e.target.value)}
                          />
                          <label
                            htmlFor="doc-option-1"
                            className="block ml-2 text-sm text-black"
                          >
                            {item}
                          </label>
                        </div>
                      )
                    })}

                    <div className="flex items-center mb-4">
                      <input
                        id="doc-option-4"
                        type="radio"
                        name="docs"
                        value="Khác"
                        className="w-5 h-5 border-gray-300"
                        aria-labelledby="docs-option-4"
                        aria-describedby="docs-option-4"
                        onClick={() => setIsElseOptDoc(true)}
                      />
                      <label
                        htmlFor="doc-option-4"
                        className="block ml-2 text-sm text-black"
                      >
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

                <hr />

                {/* Số tầng, blah blah,... */}
                <div className="mt-2 mb-1 w-full flex flex-row flex-wrap justify-between">
                  {/* Thời điểm khởi công */}
                  <div className="flex flex-col mt-2 mb-3 w-[45%]">
                    <label className="block text-sm font-medium text-black">
                      Thời điểm khởi công
                    </label>

                    <div className="flex flex-row mt-2">
                        <FormControl className="w-2/3">
                            <Select
                                displayEmpty
                                value={yQuarterStart}
                                style={{ height: 38, fontSize: 14 }}
                                className="text-sm"
                                onChange={(e) => {
                                    setYQuarterStart(e.target.value)
                                }}
                            >
                                {yearQuarters.map((item, index) => {
                                    return (
                                    <MenuItem
                                        key={index}
                                        value={item}
                                        style={{ fontSize: 14 }}
                                    >
                                        {item}
                                    </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl className="w-full ml-2">
                            <Select
                                displayEmpty
                                value={startYear}
                                style={{ height: 38, fontSize: 14 }}
                                className="text-sm"
                                onChange={(e) => {
                                    setStartYear(e.target.value)
                                }}
                            >
                                {years.map((item, index) => {
                                    return (
                                    <MenuItem
                                        key={index}
                                        value={item}
                                        style={{ fontSize: 14 }}
                                    >
                                        {item}
                                    </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                  </div>

                  {/* Thời điểm hoàn thành */}
                  <div className="flex flex-col mt-2 mb-3 w-[45%]">
                    <label className="block text-sm font-medium text-black">
                      Thời điểm hoàn thành
                    </label>

                    <div className="flex flex-row mt-2">
                        <FormControl className="w-2/3">
                            <Select
                                displayEmpty
                                value={yQuarterEnd}
                                style={{ height: 38, fontSize: 14 }}
                                className="text-sm"
                                onChange={(e) => {
                                    setYQuarterEnd(e.target.value)
                                }}
                            >
                                {yearQuarters.map((item, index) => {
                                    return (
                                    <MenuItem
                                        key={index}
                                        value={item}
                                        style={{ fontSize: 14 }}
                                    >
                                        {item}
                                    </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl className="w-full ml-2">
                            <Select
                                displayEmpty
                                value={endYear}
                                style={{ height: 38, fontSize: 14 }}
                                className="text-sm"
                                onChange={(e) => {
                                    setEndYear(e.target.value)
                                }}
                            >
                                {years.map((item, index) => {
                                    return (
                                    <MenuItem
                                        key={index}
                                        value={item}
                                        style={{ fontSize: 14 }}
                                    >
                                        {item}
                                    </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      Số căn hộ / nhà
                    </label>
                    <input
                      type="text"
                      id="apartments"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="0"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setApartments(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      Số tòa
                    </label>
                    <input
                      type="text"
                      id="buildings"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="0"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setBuildings(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "57%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      Mật độ xây dựng (%)
                    </label>
                    <input
                      type="text"
                      id="bedrooms"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="0"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setDensity(parseInt(e.target.value))
                      }}
                    />
                  </div>
                </div>

                <hr className="mt-2"/>

                {/* Tiện ích */}
                <div className="mt-3 mb-2 w-full flex flex-col">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Tiện ích
                  </label>

                  <FormControl fullWidth>
                    <Select
                      multiple
                      style={{ height: 38, fontSize: 14 }}
                      value={prjUtilities}
                      onChange={(e) => {
                        setPrjUtilities(
                          // On autofill we get a stringified value.
                          typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
                        );
                      }}
                      renderValue={(selected) => selected.join(" - ")}
                      MenuProps={MenuProps}
                    >
                      {utilities.map((name) => (
                        <MenuItem key={name} value={name} className="h-[40px] text-sm">
                          <Checkbox checked={prjUtilities.indexOf(name) > -1} />
                          <ListItemText primary={name} className="text-sm"/>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              {/* Upload ảnh */}
              <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                <h1 className="font-bold text-lg">Hình ảnh</h1>

                <div className="mt-2 w-1/3 self-center">
                  <label
                    htmlFor="file-upload"
                    className="block px-9 lg:px-10 py-2 h-10 text-sm font-medium text-black bg-white rounded border border-gray-300 cursor-pointer hover:border-blue-700 hover:border-2"
                  >
                    Chọn ảnh
                  </label>
                  <input
                    className="hidden"
                    aria-describedby="file-upload"
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageSelected(e)}
                  />
                </div>

                {
                  images.length > 0 ?
                  (
                    <div className="mt-3 w-full flex flex-row flex-wrap items-center justify-between">
                      {images.map((item, index) => {
                        return (
                          <div
                            className="w-[30%] mt-1 mb-1 relative hover:cursor-pointer"
                            key={index}
                          >
                            <img
                              src={item}
                              className="rounded-lg hover:opacity-90"
                              alt="Ảnh đã chọn"
                            />

                            <button
                              onClick={() => updateDisplayImages(index)}
                              className="group absolute top-1 right-1 bg-white w-6 h-6 rounded-full hover:bg-blue-500"
                            >
                              <span className="text-sm material-icons-outlined text-gray-600 group-hover:text-white">
                                close
                              </span>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  ) : null
                }
              </div>
            </div>

            {/* Loại bài đăng */}
            <div className="post-type w-full mt-8 lg:mt-0 lg:w-1/4 lg:ml-4 h-max flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
              <div className="mt-2 mb-2">
                <div className="flex flex-row">
                  <label
                    htmlFor="post-type"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Loại tin đăng
                  </label>
                  <span className="text-sm text-rose-800">&nbsp;(*)</span>
                </div>

                <FormControl style={{ width: "50%" }}>
                  <Select
                    displayEmpty
                    value={postType}
                    className="text-sm"
                    style={{ height: 38, fontSize: 14 }}
                    onChange={(e) => {
                      handlePostTypeIndex(e)
                      setPostType(e.target.value)
                    }}
                  >
                    {postTypes.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item._id}
                          style={{ fontSize: 14 }}
                        >
                          {item.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>

              <div className="flex flex-row justify-between">
                <div className="mt-2 mb-2 w-2/5">
                  <div className="flex flex-row">
                    <label
                      htmlFor="post-type"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Số ngày đăng
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>

                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={postDuration.toString()}
                      style={{ height: 38, fontSize: 14 }}
                      onChange={(e) =>
                        setPostDuration(parseInt(e.target.value))
                      }
                    >
                      {post_durations.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item}
                            style={{ fontSize: 14 }}
                          >
                            {item} ngày
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className="mt-2 mb-2" style={{ width: "54%" }}>
                  <div className="flex flex-row">
                    <label
                      htmlFor="post-type"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Ngày bắt đầu
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <input
                    type="date"
                    className="bg-white px-1 pl-2 h-10 border border-gray-300 text-black sm:text-sm rounded hover:border-black focus:border-blue-700"
                    placeholder="Select date"
                    style={{ width: "98%" }}
                    onChange={(e) => {handleDateSelected(e)}}
                  />
                </div>
              </div>

              {
                falseDate ?
                    <p className="text-red-700 text-sm">* Ngày bắt đầu phải từ hôm nay trở đi</p>
                : null
              }

              <div className="bg-blue-200 w-full h-40 py-1 px-3 mt-4 rounded-lg">
                <div className="flex flex-row justify-between mt-2 mt-2 mb-3">
                  <p className="text-black text-sm font-medium">
                    Loại tin đăng
                  </p>
                  <p className="text-black text-sm">
                    {postTypes.length > 0 ? postTypes[postTypeIndex].name : ""}
                  </p>
                </div>

                <div className="flex flex-row justify-between mt-2 mb-3">
                  <p className="text-black text-sm font-medium">
                    Đơn giá / ngày
                  </p>
                  <p className="text-black text-sm">
                    {postTypes.length > 0
                      ? MoneyFormat(postTypes[postTypeIndex].price)
                      : ""}{" "}
                    VNĐ
                  </p>
                </div>

                <div className="flex flex-row justify-between mt-2 mb-3">
                  <p className="text-black text-sm font-medium">Số ngày đăng</p>
                  <p className="text-black text-sm">
                    {postDuration == 0 ? post_durations[0] : postDuration}
                  </p>
                </div>

                <hr className="border-1 border-solid border-black" />

                <div className="flex flex-row justify-between mt-2 mb-3">
                  <p className="text-black text-lg font-medium">Bạn trả</p>
                  <p className="text-black text-lg font-medium">
                    {postTypes.length > 0
                      ? MoneyFormat(
                          postDuration == 0 && postTypeIndex == 0
                            ? postTypes[postTypeIndex].price *
                                parseInt(post_durations[0])
                            : postDuration * postTypes[postTypeIndex].price
                        )
                      : ""}{" "}
                    VNĐ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload button */}
          {
            !showAlert ?
            (
              <div className="w-full text-center">
                <button
                  className="bg-blue-700 flex flex-row items-center justify-center w-full lg:w-1/12 mx-auto px-2 py-2 mt-6 rounded-md text-center cursor-pointer hover:bg-blue-800"
                  onClick={() => {
                    handleCreatePost()
                  }}
                >
                  <p className="text-white text-center">Đăng tin</p>
                  <SendIcon fontSize="small" style={{color: '#fff'}} className="ml-1"/>
                </button>
              </div>
            )
            :
            (
              <div className="w-full lg:w-1/2 mx-auto mt-6">
                <Alert
                  severity="success"
                  onClose={() => {
                    setShowAlert(false)
                  }}
                >
                  <AlertTitle>Thành công</AlertTitle>
                    Tin đăng của bạn đã được ghi nhận —{" "} <strong>Vui lòng chờ kiểm duyệt của QTV!</strong>
                </Alert>
              </div>
            )
          }

          {/* /* Check all fields alert */}
          {
            checkFieldsAlert ?
            (
              <div className="w-full lg:w-1/2 mx-auto mt-6">
                <Alert
                  severity="error"
                  onClose={() => {
                    setCheckFieldsAlert(false)
                  }}
                >
                  <AlertTitle>Thất bại</AlertTitle>
                    Kiểm tra lại tất cả thông tin — {" "} <strong>Vui lòng thử lại!</strong>
                </Alert>
              </div>
            ) : null
          }
        </div>
      </div>

      <Footer/>

      <Backdrop
        className="flex flex-col"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
        <p className="mt-4 text-base text-white">
          Đang thực hiện. Bạn vui lòng chờ chút nhé!
        </p>
      </Backdrop>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    console.log("Getting post list from Server...")
    const res = await fetch(`${server}/a/province/get`)
    let data = await res.json()
    data = data.data
    let provinces = new Array()
    let bigCity = ["SG", "HN", "DDN", "BD", "DN"]
    data.forEach((province: any) => {
      let obj = {
        value: province._id,
        label: province.provinceName,
        slug: province.slug,
      }
  
      provinces.push(obj)
    })
    return { props: { provinces } }
}

export default UploadProject