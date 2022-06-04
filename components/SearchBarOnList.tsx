import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { Province } from "../interfaces/Province"

import { Search } from '../interfaces/search'
import { EstateType } from "../interfaces/estateType"
import server from "../interfaces/server"


interface Props {
    callback: any
}

const SearchBarOnList = ({callback} : Props) => {
  const [SearchExpand, setSearchExpand] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [estateType, setEstateType] = useState("sell")

  const [price, setPrice] = useState("")
  const [area, setArea] = useState("")

  const [search, setSearch] = useState<Search>({
    province: "",
    district: "",
    ward: "",
    street: "",
    price: "",
    area: "",
    type: "",
    bedroom: "",
    width: "",
    streetWidth: "",
    orientation: "",
  })

  const [provinces, setProvinces] = useState(new Array())
  const [districts, setDistrics] = useState(new Array())
  const [wards, setWards] = useState(new Array())
  const [streets, setStreets] = useState(new Array())
  const [types, setTypes] = useState([])

  const prices = [
    { value: "mat-tien", label: "Thỏa thuận" },
    { value: "mat-tien2", label: "< 500 triệu" },
    { value: "mat-tien3", label: "500 - 800 triệu" },
    { value: "mat-tien4", label: "800 triệu - 1 tỷ" },
    { value: "mat-tien5", label: "1 tỷ - 3 tỷ" },
    { value: "mat-tien6", label: "3 tỷ - 7 tỷ" },
    { value: "mat-tien7", label: "7 tỷ - 10 tỷ" },
    { value: "mat-tien8", label: "> 10 tỷ" },
  ]

  const areas = [
    { value: "mat-tien", label: "< 30 m²" },
    { value: "mat-tien2", label: "30m² - 100 m²" },
    { value: "mat-tien3", label: "100m² - 200m²" },
    { value: "mat-tien4", label: "200m² - 500m²" },
    { value: "mat-tien5", label: "> 500m²" },
  ]

  const projects = [
    { value: "project-1", label: "Vinhomes 1" },
    { value: "project-2", label: "Vinhomes 2" },
    { value: "project-3", label: "Vinhomes 3" },
    { value: "project-4", label: "Vinhomes 4" },
    { value: "project-5", label: "Vinhomes 5" },
  ]

  const projectStatus = [
    { value: "project-1", label: "Tất cả" },
    { value: "project-2", label: "Sắp mở bán" },
    { value: "project-3", label: "Đang mở bán" },
    { value: "project-4", label: "Đã bàn giao" },
  ]

  const bedroom = [
    { value: "project-1", label: "1 - 2" },
    { value: "project-2", label: "3 - 5" },
    { value: "project-3", label: "> 5" },
  ]

  const width = [
    { value: "4mt", label: " <= 4m" },
    { value: "6mt", label: "4m - 10m" },
    { value: "10mt", label: "10m - 20m" },
    { value: "12mt", label: "20m - 50m" },
    { value: "12mt", label: "> 50m" },
  ]

  const streetWidth = [
    { value: "4mt", label: "4m" },
    { value: "6mt", label: "6m" },
    { value: "10mt", label: "10m" },
    { value: "12mt", label: "12m" },
  ]

  const orientation = [
    { value: "4mt", label: "Đống" },
    { value: "6mt", label: "Đông Bắc" },
    { value: "10mt", label: "Bắc" },
    { value: "12mt", label: "Tấy Bắc" },
    { value: "12mt", label: "Tấy" },
    { value: "12mt", label: "Tấy Nam" },
    { value: "12mt", label: "Nam" },
    { value: "12mt", label: "Đông Nam" },
  ]

  useEffect(() => {
    fetch(`${server}/a/estate-type/get`)
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.data)
      })
  }, [])

  useEffect(() => {
    fetch(`${server}/a/province/get`)
      .then((res) => res.json())
      .then((data) => {
        let datas = data.data
        let provinces = new Array()
        datas.forEach((province: any) => {
          let obj = {
            value: province._id,
            label: province.provinceName,
            slug: province.slug,
          }
          provinces.push(obj)
        })
        setProvinces(provinces)
      })
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    switch (newValue) {
      case 0:
        setEstateType("hire")
        break
      case 1:
        setEstateType("sell")
        break
      case 2:
        setEstateType("project")
        break
      default:
        setEstateType("hire")
        break
    }
  }

  const onSearch = () => {
    callback(search)
  }

  const onTypeChange = (event: SelectChangeEvent) => {
    let type = event.target.value.toString()
    if (search != undefined && type != undefined) {
      setSearch({
        ...search,
        type: type,
      })
    }
  }

  const onAreaChange = (event: SelectChangeEvent) => {
    let area = event.target.value.toString()
    if (search != undefined && area != undefined) {
      setSearch({
        ...search,
        area: area,
      })
    }
  }

  const onPriceChange = (event: SelectChangeEvent) => {
    let price = event.target.value.toString()
    if (search != undefined && price != undefined) {
      setSearch({
        ...search,
        price: price,
      })
    }
  }

  const onProvinceChange = (event: SelectChangeEvent) => {
    let provinceId = event.target.value.toString()
    console.log(provinceId)
    if (search != undefined && provinceId != undefined) {
      search.province = provinceId
    }
    fetchDistrict(provinceId)
  }

  const onDistrictChange = (event: SelectChangeEvent) => {
    let districtId = event.target.value.toString()
    if (search != undefined && districtId != undefined) {
      search.district = districtId
    }
    fetchWard(districtId)
    fetchStreet(districtId)
  }

  const onWardChange = (event: SelectChangeEvent) => {
    let wardId = event.target.value.toString()
    if (search != undefined) {
      setSearch({
        ...search,
        ward: wardId,
      })
    }
  }

  const onStreetChange = (event: SelectChangeEvent) => {
    let streetId = event.target.value.toString()
    if (search != undefined) {
      setSearch({
        ...search,
        street: streetId,
      })
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
            }
            ds.push(d)
          })
          setDistrics(ds)
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
            }
            ss.push(s)
          })
          setStreets(ss)
        })
    }
  }

  const expandSearch = () => {
    setSearchExpand(!SearchExpand)
  }

  return (
    <div className="md:sticky md:top-0 w-full mr-auto ml-auto md:grid md:bg-white drop-shadow-xl z-10">
      <Box className="mb-2 md:min-w-min text-white">
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Nhà cho thuê" />
          <Tab label="Nhà bán/ sang nhượng" />
          <Tab label="Dự án" />
        </Tabs>
      </Box>

      <div className="md:px-4 md:py-2">
        <div className="p-4 grid grid-full grid-cols-16 gap-4 inline-flex items-center">
          <div className="col-span-16 mt-2 mb-1 md:mb-0 md:mt-0 lg:col-span-2 inline-flex items-center">
            <FormControl fullWidth size="small">
              <InputLabel className="text-sm" id="label-input-type">
                Loại nhà đất
              </InputLabel>
              <Select
                labelId="label-input-type"
                id="input-type"
                value={search.type}
                label="Loại nhà đất"
                onChange={onTypeChange}
              >
                {types.map((type: EstateType) => {
                  return (
                    <MenuItem key={type._id} value={type._id}>
                      {type.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          <div className="h-full relative col-span-16 sm:col-span-9 lg:col-span-5 mb-2 md:mb-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-icons">search</span>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block h-full w-full pl-10 p-2 "
              placeholder="Bạn tìm kiếm gì hôm nay?"
            />
          </div>
          <div className="col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-2">
            <FormControl fullWidth size="small">
              <InputLabel id="label-input-city">Tỉnh/ thành phố</InputLabel>
              <Select
                labelId="label-input-city"
                id="input-city"
                value={search.province}
                label="Tỉnh/ thành phố"
                onChange={onProvinceChange}
              >
                {provinces.map((province) => {
                  return (
                    <MenuItem key={province.value} value={province.value}>
                      {province.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-2">
            <FormControl fullWidth size="small">
              <InputLabel id="label-input-price">Khoảng giá</InputLabel>
              <Select
                labelId="label-input-price"
                id="input-price"
                value={search.price}
                label="Khoảng giá"
                onChange={onPriceChange}
              >
                {prices.map((price) => {
                  return (
                    <MenuItem key={price.value} value={price.value}>
                      {price.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          {estateType != "project" ? (
            <div className="col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-2">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-area">Diện tích</InputLabel>
                <Select
                  labelId="label-input-area"
                  id="input-area"
                  value={search.area}
                  label="Diện tích"
                  onChange={onAreaChange}
                >
                  {areas.map((area) => {
                    return (
                      <MenuItem key={area.value} value={area.value}>
                        {area.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          ) : (
            <div className="col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-area">Tình trạng</InputLabel>
                <Select
                  labelId="label-input-area"
                  id="input-area"
                  value={search.area}
                  label="Diện tích"
                  onChange={onAreaChange}
                >
                  {projectStatus.map((status) => {
                    return (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          )}
          {estateType != "project" ? (
            <div className="inline-flex justify-center items-center col-span-8 sm:col-span-6 md:col-span-4 lg:col-span-1">
              <button
                className="justify-center text-blue-700 text-xs font-medium w-full inline-flex items-center rounded-lg text-sm"
                type="button"
                onClick={expandSearch}
              >
                <p>Mở rộng</p>
                <span className="material-icons">arrow_drop_down</span>
              </button>
            </div>
          ) : null}
          <div className="col-span-16 sm:col-span-12 lg:col-span-2">
            <button
              type="button"
              className="text-white h-full w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => {
                onSearch()
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {SearchExpand ? (
          <div className="grid grid-cols-12 gap-4 mt-4 p-4">
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Quận/ huyện
                </InputLabel>
                <Select
                  value={search.district}
                  label="Quận/ huyện"
                  onChange={onDistrictChange}
                >
                  {districts.map((district) => {
                    return (
                      <MenuItem key={district.value} value={district.value}>
                        {district.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div
              key={"ward"}
              className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3"
            >
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">
                  Phường/ xã/ thị trấn
                </InputLabel>
                <Select
                  value={search.ward}
                  label="Phường/ xã/ thị trấn"
                  onChange={onWardChange}
                >
                  {wards.map((ward) => {
                    return (
                      <MenuItem key={ward.value} value={ward.value}>
                        {ward.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Đường/ phố</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={search.street}
                  label="Đường/ phố"
                  onChange={onStreetChange}
                >
                  {streets.map((street) => {
                    return (
                      <MenuItem key={street.value} value={street.value}>
                        {street.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Dự án</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={search.street}
                  label="Đường/ phố"
                  onChange={onStreetChange}
                >
                  {streets.map((street) => {
                    return (
                      <MenuItem key={street.value} value={street.value}>
                        {street.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Số phòng ngủ</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={search.bedroom}
                  label="Số phòng ngủ"
                  onChange={(event: SelectChangeEvent) => {
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        bedroom: event.target.value.toString(),
                      })
                    }
                  }}
                >
                  {bedroom.map((num) => {
                    return (
                      <MenuItem key={num.value} value={num.value}>
                        {num.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Hướng nhà</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={search.orientation}
                  label="Hướng nhà"
                  onChange={(event: SelectChangeEvent) => {
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        orientation: event.target.value.toString(),
                      })
                    }
                  }}
                >
                  {orientation.map((orientation) => {
                    return (
                      <MenuItem
                        key={orientation.value}
                        value={orientation.value}
                      >
                        {orientation.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Đường rộng</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={search.streetWidth}
                  label="Đường rộng"
                  onChange={(event: SelectChangeEvent) => {
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        streetWidth: event.target.value.toString(),
                      })
                    }
                  }}
                >
                  {streetWidth.map((width) => {
                    return (
                      <MenuItem key={width.value} value={width.value}>
                        {width.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Mặt tiền</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={search.width}
                  label="Mặt tiền"
                  onChange={(event: SelectChangeEvent) => {
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        width: event.target.value.toString(),
                      })
                    }
                  }}
                >
                  {width.map((width) => {
                    return (
                      <MenuItem key={width.value} value={width.value}>
                        {width.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchBarOnList
