import type { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import { useState, useEffect } from "react"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Backdrop from "@mui/material/Backdrop"
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from "@mui/material/CircularProgress"
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
  getProvinceId,
} from "../../util/Address"
import { Province } from "../../interfaces/Province"
import { useRouter } from "next/router"

type Props = {
  provinces: Province[]
}

const UploadPost = (props: Props) => {
  const router = useRouter()
  const [postTypes, setPostTypes] = useState(new Array())
  const [estateTypes, setEstateTypes] = useState(new Array())
  const [districts, setDistricts] = useState(new Array())
  const [wards, setWards] = useState(new Array())
  const [streets, setStreets] = useState(new Array())
  const [priceUnits, setPriceUnits] = useState(new Array())
  const [projects, setProjects] = useState(new Array())

  const [usrId, setUsrId] = useState("")
  const [purpose, setPurpose] = useState("sell")
  const [category, setCategory] = useState("")
  const [displayAddress, setDisplayAdress] = useState("")
  const [projectId, setProjectId] = useState("")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [quarter, setQuarter] = useState("")
  const [street, setStreet] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [areaSqr, setAreaSqr] = useState(0)
  const [price, setPrice] = useState(0)
  const [priceUnit, setPriceUnit] = useState("")
  const [document, setDocument] = useState("")
  const [isElseOptDoc, setIsElseOptDoc] = useState(false)
  const [floor, setFloor] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [width, setWidth] = useState(0)
  const [depth, setDepth] = useState(0)
  const [roadWidth, setRoadWidth] = useState(0)
  const [direction, setDirection] = useState("")
  const [furniture, setFuniture] = useState("")
  const [images, setImages] = useState(new Array())
  const [mapMarker, setMapMarker] = useState([0, 0])

  const [postTypeIndex, setPostTypeIndex] = useState(0)
  const [postDuration, setPostDuration] = useState(0)
  const [postType, setPostType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [expireDate, setExpireDate] = useState("")
  const [reviewExpireDate, setReviewExpireDate] = useState("")
  const [falseDate, setFalseDate] = useState(false)

  const [backdrop, setBackDrop] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [files, setFiles] = useState("")
  const [checkFieldsAlert, setCheckFieldsAlert] = useState(false)

  const purposes = ["B??N", "CHO THU??"]

  const documents = ["S??? ?????/ S??? h???ng", "H???p ?????ng mua b??n", "??ang ch??? s???"]

  const furnitures = ["?????y ?????", "Kh??ng c??"]

  const post_durations = ["7", "10", "14", "21"]

  const getPriceTypeId = (name: string) => {
    var res = ""
    for (let index = 0; index < priceUnits.length; index++) {
      const element = priceUnits[index];
      if (element.name = name) {
        res = element._id
        break
      }
    }
    return res
  }

  const getEstateTypeId = (name: string) => {
    var res = ""
    for (let index = 0; index < estateTypes.length; index++) {
      const element = estateTypes[index];
      if (element.name = name) {
        res = element._id
        break
      }
    }
    console.log(res + ": OK")
    return res
  }

  const getProjectName = (id: string) => {
    var res = ""
    for (let index = 0; index < projects.length; index++) {
      const element = projects[index];
      if (element._id = id) {
        res = element.name
        break
      }
    }
    return res
  }

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

  const preventCharInput = (e: any) => {
    var regex = new RegExp("[0-9\b]+")
    var charCode = typeof e.which == "undefined" ? e.keyCode : e.which
    var charStr = String.fromCharCode(charCode)
    if (!regex.test(charStr)) {
      e.preventDefault()
    }
  }

  const handleDateSelected = (e: any) => {
    var reviewDays = 0
    const today = new Date()
    const selected = new Date(e.target.value)
    var expire = new Date(e.target.value)
    expire.setDate(selected.getDate() + postDuration)

    postType == "627ba283ea534ab59178172a" ? reviewDays = 3 : reviewDays = 1

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
        today.setDate(today.getDate() + reviewDays)
        setReviewExpireDate(
          today.getDate() + "/" +
          (today.getMonth() + 1).toString() +
          "/" + today.getFullYear()
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
    console.log(e.target.files)
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
      const response = await fetch(`${server}/post/upload`, {
        method: "POST",
        body: JSON.stringify({
          "title": title,
          "address": displayAddress,
          "ownerId": usrId,
          "postTypeId": postType,
          "estateTypeId": category,
          "forSaleOrRent": purpose == "B??N" ? "sale" : "rent",
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
            "StreetPrefix": "???????ng",
            "TextSearch": displayAddress,
            "WardId": getWardId(quarter, wards),
            "WardName": getWardName(quarter, wards),
            "WardPrefix": getWardPrefix(quarter, wards),
          },
          "cor": {
            "lat": mapMarker[1],
            "Lng": mapMarker[0],
          },
          "belongToProject": {
            "projectId": projectId,
            "projectName": getProjectName(projectId),
          },
          "description": description,
          "images": urlArr.data,
          "legalDocuments": document,
          "publishedDate": startDate,
          "expiredDate": expireDate,
          "reviewExpireDate": reviewExpireDate,
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
          "views": 0,
          "payAmount": postDuration * postTypes[postTypeIndex].price,
          "status": "waiting",
          "slug": "slug",
          "declineReasonId": ""
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
      purpose == "" ||
      category == "" ||
      displayAddress == "" ||
      city == "" ||
      district == "" ||
      quarter == "" ||
      street == "" ||
      title == "" ||
      description == "" ||
      areaSqr == 0 ||
      price == 0 ||
      priceUnit == "" ||
      document == "" ||
      falseDate ||
      images.length < 1
    ) {
      return false
    }
    return true
  }

  useEffect(() => {
    const fetchEstateTypes = async () => {
      console.log("Getting estate types from Server...")
      const res = await fetch(`${server}/a/estate-type/get`)
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

    const fetchPriceUnits = async () => {
      console.log("Getting price units from Server...")
      const res = await fetch(`${server}/a/price-unit/get`)
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

    const fetchCurrentUser = async () => {
      await
      fetch(`${server}/user/currentUser`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setUsrId(data.user._id)
        console.log("UserID: " + data.user._id)
      })
    }

    const fetchProjects = async () => {
      const res = await fetch(`${server}/project/get?limit=12`)
      let data = await res.json()
      
      data = data.data
      let prjs = new Array()

      data.forEach((post: any) => {
          let obj = {
              _id: post._id,
              name: post.name,
          }
          prjs.push(obj)
      })
      setProjects(prjs)
    }

    fetchEstateTypes()
    fetchPostTypes()
    fetchPriceUnits()
    fetchCurrentUser()
    fetchProjects()
  }, [])

  useEffect(() => {
    const fetchPostOnEdit = async () => {
      if (router.query.id) {
        const res = await fetch(`${server}/post/get?id=${router.query.id}`)
        let data = await res.json()

        data = data.data

        // setPurpose(data.forSaleOrRent=="sale" ? purpose[0] : purpose[1])
        setCategory(getEstateTypeId(data.estateType.name))
        setDisplayAdress(data.address)
        setCity(getProvinceId(data.location.CityName, props.provinces))
        setDistrict(getDistrictId(data.location.DistrictName, districts))
        setQuarter(data.location.WardName || "")
        setStreet(data.location.StreetName || "")
        setTitle(data.title)
        setDescription(data.description)
        setAreaSqr(data.area)
        setPrice(data.price)
        setPriceUnit(getPriceTypeId(data.priceType))
        setDocument(data.legalDocuments)
        setFloor(data.floorNumber)
        setBathrooms(data.bathroomNumber)
        setBedrooms(data.bedroomNumber)
        setDepth(data.depth)
        setWidth(data.width)
        setRoadWidth(data.roadWidth)
        setDirection(data.direction)
        setFuniture(data.furniture || "")
        setImages(data.images)
      }
    }

    fetchPostOnEdit()
  }, [estateTypes])

  return (
    <>
      <Header/>

      {/* Upload post */}
      <div className="bg-white">
        <div
          className="max-w-2xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8"
          style={{ maxWidth: "1200" }}
        >
          <h2 className="font-bold text-xl text-center mb-4">{router.query.id ? 'S???a tin' : '????ng tin'}</h2>

          <div className="flex flex-col lg:flex-row justify-center">
            {/* Form th??ng tin b??i ????ng */}
            <div className="post-info flex flex-col w-full lg:w-2/5">
              {/* Th??ng tin c?? b???n */}
              <div className="flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
                <h1 className="font-bold text-lg">Th??ng tin c?? b???n</h1>
                <div className="flex flex-row">
                  <p className="text-sm">Th??ng tin c?? d???u</p>
                  <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                  <p className="text-sm">l?? b???t bu???c</p>
                </div>

                <div className="mt-4">
                  <fieldset className="flex flex-row">
                    <legend className="sr-only">Post type</legend>
                    <div className="flex items-center mb-4">
                      <input
                        id="type-option-1"
                        type="radio"
                        name="types"
                        value="sell"
                        className="w-5 h-5 border-gray-300"
                        aria-labelledby="country-option-1"
                        aria-describedby="country-option-1"
                        onClick={() => setPurpose(purposes[0])}
                      />
                      <label
                        htmlFor="type-option-1"
                        className="block ml-2 text-sm text-black"
                      >
                        {purposes[0].toUpperCase()}
                      </label>
                    </div>

                    <div className="flex items-center mb-4 ml-12">
                      <input
                        id="type-option-2"
                        type="radio"
                        name="types"
                        value="rent"
                        className="w-5 h-5 border-gray-300"
                        aria-labelledby="country-option-2"
                        aria-describedby="country-option-2"
                        onClick={() => setPurpose(purposes[1])}
                      />
                      <label
                        htmlFor="type-option-2"
                        className="block ml-2 text-sm text-black"
                      >
                        {purposes[1].toUpperCase()}
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div className="mt-2 mb-2">
                  <div className="flex flex-row">
                    <label
                      htmlFor="categories"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Lo???i b???t ?????ng s???n
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
                      {estateTypes.map((item, index) => {
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
                      htmlFor="categories"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Thu???c v??? d??? ??n
                    </label>
                  </div>

                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={projectId}
                      style={{ height: 38, fontSize: 14 }}
                      className="text-sm"
                      onChange={(e) => {
                        setProjectId(e.target.value)
                      }}
                    >
                      {projects.map((item, index) => {
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
                      ?????a ch???
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <input
                    type="text"
                    className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-cyan-700"
                    placeholder="?????a ch??? hi???n th???"
                    required
                    value={displayAddress}
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
                        T???nh, th??nh ph???
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
                        Qu???n, huy???n
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
                        Ph?????ng, x??
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
                        ???????ng, ph???
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
                  <label className="block mb-2 text-sm font-medium text-black">????nh d???u tr??n b???n ?????</label>
                  
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

              {/* Th??ng tin b??i vi???t */}
              <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                <h1 className="font-bold text-lg">Th??ng tin b??i vi???t</h1>
                <div className="flex flex-row">
                  <p className="text-sm">Th??ng tin c?? d???u</p>
                  <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                  <p className="text-sm">l?? b???t bu???c</p>
                </div>

                <div className="mt-4 mb-2">
                  <div className="flex flex-row">
                    <label className="block mb-2 text-sm font-medium text-black">
                      Ti??u ?????
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <textarea
                    name="title"
                    id="title"
                    cols={1}
                    rows={2}
                    value={title}
                    className="bg-white h-16 border border-gray-300 text-black text-sm rounded block w-full p-2.5 resize-none hover:border-black focus:border-blue-700"
                    placeholder="Ti??u ????? hi???n th???"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <p className="text-xs mt-2">
                    T???i thi???u 40 k?? t???, t???i ??a 99 k?? t???
                  </p>
                </div>

                <div className="mt-4 mb-2">
                  <div className="flex flex-row">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      M?? t???
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <textarea
                    name="title"
                    id="title"
                    cols={1}
                    rows={2}
                    value={description}
                    className="bg-white h-44 border border-gray-300 text-black text-sm rounded block w-full p-2.5 resize-none hover:border-black focus:border-blue-700"
                    placeholder="Nh???p m?? t??? v??? b???t ?????ng s???n c???a b???n"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <p className="text-xs mt-2">
                    T???i thi???u 30 k?? t???, t???i ??a 4000 k?? t???
                  </p>
                </div>
              </div>

              {/* Th??ng tin B??S */}
              <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                <h1 className="font-bold text-lg">Th??ng tin b???t ?????ng s???n</h1>
                <div className="flex flex-row">
                  <p className="text-sm">Th??ng tin c?? d???u</p>
                  <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                  <p className="text-sm">l?? b???t bu???c</p>
                </div>

                <div className="mt-4 mb-2 w-1/3">
                  <div className="flex flex-row">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Di???n t??ch (m??)
                    </label>
                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                  </div>
                  <input
                    type="text"
                    id="areaSqr"
                    className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                    placeholder="Di???n t??ch (m??)"
                    required
                    value={
                      isNaN(areaSqr) || areaSqr == 0 ? "" : areaSqr.toString()
                    }
                    onKeyDown={(e) => preventCharInput(e)}
                    onChange={(e) => setAreaSqr(parseInt(e.target.value))}
                  />
                </div>

                <div className="mt-4 mb-2 w-full flex flex-row justify-between">
                  <div className="w-3/5">
                    <div className="flex flex-row">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        M???c gi??
                      </label>
                      <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>
                    <input
                      type="text"
                      id="price"
                      className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="M???c gi??"
                      required
                      value={isNaN(price) || price == 0 ? "" : price.toString()}
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                    />
                  </div>

                  <div className="w-2/6">
                    <div className="flex flex-row">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        ????n v???
                      </label>
                      <span className="text-sm text-rose-800">&nbsp;(*)</span>
                    </div>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        value={priceUnit}
                        style={{ height: 38, fontSize: 14 }}
                        onChange={(e) => setPriceUnit(e.target.value)}
                      >
                        {priceUnits.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item._id}
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

                {/* Gi???y t??? ph??p l?? */}
                <div className="mt-4 mb-2 w-full flex flex-col">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Gi???y t??? ph??p l??
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
                        value="Kh??c"
                        className="w-5 h-5 border-gray-300"
                        aria-labelledby="docs-option-4"
                        aria-describedby="docs-option-4"
                        onClick={() => setIsElseOptDoc(true)}
                      />
                      <label
                        htmlFor="doc-option-4"
                        className="block ml-2 text-sm text-black"
                      >
                        Kh??c
                      </label>
                      <input
                        type="text"
                        id="doc_else"
                        className="bg-white ml-3 border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                        placeholder="Nh???p"
                        onChange={(e) => {
                          isElseOptDoc ? setDocument(e.target.value) : null
                        }}
                      />
                    </div>
                  </fieldset>
                </div>

                <hr />

                {/* S??? t???ng, blah blah,... */}
                <div className="mt-2 mb-1 w-full flex flex-row flex-wrap justify-between">
                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      S??? t???ng
                    </label>
                    <input
                      type="text"
                      id="floors"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="0"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setFloor(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      Chi???u r???ng
                    </label>
                    <input
                      type="text"
                      id="width"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="(m)"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setWidth(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      S??? ph??ng ng???
                    </label>
                    <input
                      type="text"
                      id="bedrooms"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="0"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setBedrooms(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      Chi???u s??u
                    </label>
                    <input
                      type="text"
                      id="depth"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="(m)"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setDepth(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      S??? ph??ng t???m
                    </label>
                    <input
                      type="text"
                      id="bathrooms"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="0"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setBathrooms(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      ???????ng r???ng
                    </label>
                    <input
                      type="text"
                      id="entrance-width"
                      className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded block w-full p-2.5 hover:border-black focus:border-blue-700"
                      placeholder="(m)"
                      required
                      onKeyDown={(e) => preventCharInput(e)}
                      onChange={(e) => {
                        setRoadWidth(parseInt(e.target.value))
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      H?????ng nh??
                    </label>
                    <FormControl>
                      <Select
                        displayEmpty
                        value={direction}
                        style={{ height: 38, fontSize: 14 }}
                        onChange={(e) => setDirection(e.target.value)}
                      >
                        <MenuItem
                          key={"????ng"}
                          value={"????ng"}
                          style={{ fontSize: 14 }}
                        >
                          ????ng
                        </MenuItem>
                        <MenuItem
                          key={"T??y"}
                          value={"T??y"}
                          style={{ fontSize: 14 }}
                        >
                          T??y
                        </MenuItem>
                        <MenuItem
                          key={"Nam"}
                          value={"Nam"}
                          style={{ fontSize: 14 }}
                        >
                          Nam
                        </MenuItem>
                        <MenuItem
                          key={"B???c"}
                          value={"B???c"}
                          style={{ fontSize: 14 }}
                        >
                          B???c
                        </MenuItem>
                        <MenuItem
                          key={"T??y B???c"}
                          value={"T??y B???c"}
                          style={{ fontSize: 14 }}
                        >
                          T??y B???c
                        </MenuItem>
                        <MenuItem
                          key={"????ng B???c"}
                          value={"????ng B???c"}
                          style={{ fontSize: 14 }}
                        >
                          ????ng B???c
                        </MenuItem>
                        <MenuItem
                          key={"????ng Nam"}
                          value={"????ng Nam"}
                          style={{ fontSize: 14 }}
                        >
                          ????ng Nam
                        </MenuItem>
                        <MenuItem
                          key={"T??y Nam"}
                          value={"T??y Nam"}
                          style={{ fontSize: 14 }}
                        >
                          T??y Nam
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div
                    className="flex flex-row mt-2 mb-2 items-center justify-between"
                    style={{ width: "45%" }}
                  >
                    <label className="block text-sm font-medium text-black">
                      N???i th???t
                    </label>

                    <FormControl>
                      <Select
                        displayEmpty
                        value={furniture}
                        style={{ height: 38, fontSize: 14 }}
                        onChange={(e) => setFuniture(e.target.value)}
                      >
                        {furnitures.map((item, index) => {
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
              </div>

              {/* Upload ???nh */}
              <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                <h1 className="font-bold text-lg">H??nh ???nh</h1>

                <div className="mt-2 w-1/3 self-center">
                  <label
                    htmlFor="file-upload"
                    className="block px-8 lg:px-9 py-2 h-10 text-sm font-medium text-black bg-white rounded border border-gray-300 cursor-pointer hover:border-blue-700 hover:border-2"
                  >
                    Ch???n ???nh
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
                              alt="???nh ???? ch???n"
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

            {/* Lo???i b??i ????ng */}
            <div className="w-full mt-8 lg:mt-0 lg:w-[27%] lg:ml-4 h-max flex flex-col">
              {
                !router.query.id ?
                <div className="post-type w-full flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
                  <div className="mt-2 mb-2">
                    <div className="flex flex-row">
                      <label
                        htmlFor="post-type"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Lo???i tin ????ng
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
                          S??? ng??y ????ng
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
                                {item} ng??y
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
                          Ng??y b???t ?????u
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
                        <p className="text-red-700 text-sm">* Ng??y b???t ?????u ph???i t??? h??m nay tr??? ??i</p>
                    : null
                  }

                  <div className="bg-blue-200 w-full h-40 py-1 px-3 mt-4 rounded-lg">
                    <div className="flex flex-row justify-between mt-2 mt-2 mb-3">
                      <p className="text-black text-sm font-medium">
                        Lo???i tin ????ng
                      </p>
                      <p className="text-black text-sm">
                        {postTypes.length > 0 ? postTypes[postTypeIndex].name : ""}
                      </p>
                    </div>

                    <div className="flex flex-row justify-between mt-2 mb-3">
                      <p className="text-black text-sm font-medium">
                        ????n gi?? / ng??y
                      </p>
                      <p className="text-black text-sm">
                        {postTypes.length > 0
                          ? MoneyFormat(postTypes[postTypeIndex].price)
                          : ""}{" "}
                        VN??
                      </p>
                    </div>

                    <div className="flex flex-row justify-between mt-2 mb-3">
                      <p className="text-black text-sm font-medium">S??? ng??y ????ng</p>
                      <p className="text-black text-sm">
                        {postDuration == 0 ? post_durations[0] : postDuration}
                      </p>
                    </div>

                    <hr className="border-1 border-solid border-black" />

                    <div className="flex flex-row justify-between mt-2 mb-3">
                      <p className="text-black text-lg font-medium">B???n tr???</p>
                      <p className="text-black text-lg font-medium">
                        {postTypes.length > 0
                          ? MoneyFormat(
                              postDuration == 0 && postTypeIndex == 0
                                ? postTypes[postTypeIndex].price *
                                    parseInt(post_durations[0])
                                : postDuration * postTypes[postTypeIndex].price
                            )
                          : ""}{" "}
                        VN??
                      </p>
                    </div>
                  </div>
                </div> : null
              }

              <div className={`hidden mt-4 w-full md:mt-20 md:w-[90] md:mx-auto md:block`}>
                <Image
                  height={200}
                  width={400}
                  alt="ad_banner"
                  className="cursor-pointer"
                  src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552234/real-estate/banner-bat-dong-san-21_hhu8dh.jpg"
                />
                <Image
                  height={800}
                  width={400}
                  alt="ad_banner"
                  className="cursor-pointer"
                  src="https://res.cloudinary.com/dpc0elrwr/image/upload/v1653552342/real-estate/banner-bat-dong-san-6_hgeevs.jpg"
                />
              </div>
            </div>
          </div>

          {/* Upload button */}
          {
            !showAlert ?
            (
              <div className="w-full text-center">
                <button
                  className="bg-blue-700 flex flex-row items-center justify-center w-full lg:w-[120px] mx-auto px-2 py-2 mt-6 rounded-md text-center cursor-pointer hover:bg-blue-800"
                  onClick={() => handleCreatePost()}
                >
                  <p className="text-white text-center">{router.query.id ? 'C???p nh???t' : '????ng tin'}</p>
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
                  <AlertTitle>Th??nh c??ng</AlertTitle>
                    Tin ????ng c???a b???n ???? ???????c ghi nh???n ???{" "} <strong>Vui l??ng ch??? ki???m duy???t c???a QTV!</strong>
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
                  <AlertTitle>Th???t b???i</AlertTitle>
                    Ki???m tra l???i t???t c??? th??ng tin ??? {" "} <strong>Vui l??ng th??? l???i!</strong>
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
          ??ang th???c hi???n. B???n vui l??ng ch??? ch??t nh??!
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

export default UploadPost