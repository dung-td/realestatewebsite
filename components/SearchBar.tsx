import { NextPage, GetServerSideProps } from "next"
import React, { useState, Component, useEffect } from "react"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Autocomplete from "@mui/material/Autocomplete"
import { Province } from "../interfaces/Province"
import TextField from "@mui/material/TextField"

import { Search } from "../interfaces/search"
import { EstateType } from "../interfaces/estateType"
import server from "../interfaces/server"

interface Props {
  callback: any
}

const SearchBar = ({ callback }: Props) => {
  const [SearchExpand, setSearchExpand] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const [search, setSearch] = useState<Search>({
    keyword: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    project: "",
    price: {
      min: "",
      max: "",
    },
    area: {
      min: "",
      max: "",
    },
    type: "",
    bedroom: {
      min: "",
      max: "",
    },
    width: {
      min: "",
      max: "",
    },
    saleOrRent: "sell",
    streetWidth: {
      min: "",
      max: "",
    },
    orientation: "",
    projectStatus: "",
  })

  const [provinces, setProvinces] = useState(new Array())
  const [districts, setDistrics] = useState(new Array())
  const [wards, setWards] = useState(new Array())
  const [streets, setStreets] = useState(new Array())
  const [types, setTypes] = useState([])

  const prices = [
    { value: "null-null", label: "Thỏa thuận" },
    { value: "0-500", label: "< 500 triệu" },
    { value: "500-1000", label: "500 - 800 triệu" },
    { value: "1000-3000", label: "800 triệu - 1 tỷ" },
    { value: "3000-7000", label: "1 tỷ - 3 tỷ" },
    { value: "7000-12000", label: "3 tỷ - 7 tỷ" },
    { value: "12000-20000", label: "7 tỷ - 10 tỷ" },
    { value: "20000-max", label: "> 10 tỷ" },
  ]

  const areas = [
    { value: "0-30", label: "< 30 m²" },
    { value: "30-100", label: "30m² - 100 m²" },
    { value: "100-200", label: "100m² - 200m²" },
    { value: "200-500", label: "200m² - 500m²" },
    { value: "500-max", label: "> 500m²" },
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
    { value: "1-2", label: "1 - 2" },
    { value: "3-5", label: "3 - 5" },
    { value: "5-max", label: "> 5" },
  ]

  const width = [
    { value: "4-8", label: "4m - 8m" },
    { value: "8-20", label: "8m - 20m" },
    { value: "20-50", label: "20m - 50m" },
    { value: "50-max", label: "> 50m" },
  ]

  const streetWidth = [
    { value: "0-4", label: "< 4m" },
    { value: "8-17", label: "8m - 17m" },
    { value: "17-30", label: "17m - 30m" },
    { value: "30-max", label: "> 30m" },
  ]

  const orientation = [
    { value: "E", label: "Đông" },
    { value: "NE", label: "Đông Bắc" },
    { value: "N", label: "Bắc" },
    { value: "NW", label: "Tây Bắc" },
    { value: "W", label: "Tây" },
    { value: "SW", label: "Tây Nam" },
    { value: "S", label: "Nam" },
    { value: "SE", label: "Đông Nam" },
  ]

  // Get estate type
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
        setSearch({
          ...search,
          saleOrRent: "rent",
        })
        break
      case 1:
        setSearch({
          ...search,
          saleOrRent: "sell",
        })
        break
      case 2:
        setSearchExpand(false)
        setSearch({
          ...search,
          saleOrRent: "project",
        })
        break
      default:
        setSearch({
          ...search,
          saleOrRent: "rent",
        })
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
    let area = event.target.value.toString().split("-")
    if (search != undefined && area != undefined) {
      setSearch({
        ...search,
        area: {
          min: area[0],
          max: area[1],
        },
      })
    }
  }

  const onPriceChange = (event: SelectChangeEvent) => {
    let prices = event.target.value.toString().split("-")
    if (search != undefined && prices != undefined) {
      setSearch({
        ...search,
        price: {
          min: prices[0],
          max: prices[1],
        },
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

  const refreshSearch = (sellOrRent: string) => {
    setSearch({
      keyword: "",
      province: "",
      district: "",
      ward: "",
      street: "",
      project: "",
      price: {
        min: "",
        max: "",
      },
      area: {
        min: "",
        max: "",
      },
      type: "",
      bedroom: {
        min: "",
        max: "",
      },
      width: {
        min: "",
        max: "",
      },
      saleOrRent: sellOrRent,
      streetWidth: {
        min: "",
        max: "",
      },
      orientation: "",
      projectStatus: "",
    })
  }

  return (
    <div className="w-full md:w-3/5 mr-auto ml-auto md:grid md:bg-slate-300/95 rounded-md drop-shadow-xl">
      <Box className="mb-2 md:min-w-min text-white">
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Nhà cho thuê" />
          <Tab label="Nhà bán/ sang nhượng" />
          <Tab label="Dự án" />
        </Tabs>
      </Box>

      <div className="md:p-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 mt-2 mb-1 md:mb-0 md:mt-0 lg:col-span-2 inline-flex items-center">
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
          <div className="relative col-span-12 sm:col-span-9 lg:col-span-8 ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-icons">search</span>
            </div>
            <input
              type="text"
              value={search.keyword}
              onChange={(event) => {
                setSearch({
                  ...search,
                  keyword: event.target.value,
                })
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-full w-full pl-10 p-2 "
              placeholder="Bạn tìm kiếm gì hôm nay?"
            />
          </div>
          <div className="col-span-12 lg:col-span-2 sm:col-span-12">
            <button
              type="button"
              className="text-white h-full w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                onSearch()
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        <div className="mt-4 md:mt-0 grid grid-cols-12 gap-4 sm:p-8">
          <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
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
          <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <FormControl fullWidth size="small">
              <InputLabel id="label-input-price">Khoảng giá</InputLabel>
              <Select
                labelId="label-input-price"
                id="input-price"
                value={
                  search.price?.min == ""
                    ? ""
                    : search.price?.min + "-" + search.price?.max
                }
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
          {search.saleOrRent != "project" ? (
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-area">Diện tích</InputLabel>
                <Select
                  labelId="label-input-area"
                  id="input-area"
                  value={
                    search.area?.min == ""
                      ? ""
                      : search.area?.min + "-" + search.area?.max
                  }
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
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-area">Tình trạng</InputLabel>
                <Select
                  labelId="label-input-area"
                  id="input-area"
                  value={search.projectStatus}
                  label="Tình trạng"
                  onChange={(event: SelectChangeEvent) => {
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        projectStatus: event.target.value,
                      })
                    }
                  }}
                >
                  {projectStatus.map((area) => {
                    return (
                      <MenuItem key={area.value} value={area.value}>
                        {area.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
          )}

          {search.saleOrRent != "project" ? (
            <div className="inline-flex justify-center items-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
              <button
                className="justify-center text-blue-700 text-base font-medium w-full inline-flex items-center rounded-lg text-sm"
                type="button"
                onClick={expandSearch}
              >
                {SearchExpand ? (
                  <>
                    <p>Thu gọn</p>
                    <span className="material-icons">arrow_drop_up</span>
                  </>
                ) : (
                  <>
                    <p>Mở rộng</p>
                    <span className="material-icons">arrow_drop_down</span>
                  </>
                )}
              </button>
            </div>
          ) : null}

          <div className="inline-flex justify-center items-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-1">
            <button
              className="justify-center text-blue-700 text-base font-medium w-full inline-flex items-center text-sm "
              type="button"
              onClick={() => {
                refreshSearch(search.saleOrRent || "sell")
              }}
            >
              <span className="material-icons rounded-lg hover:bg-slate-300 p-1">
                autorenew
              </span>
            </button>
          </div>
        </div>

        {SearchExpand ? (
          <div className=" grid grid-cols-12 gap-4 mt-4 sm:p-8">
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
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
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
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
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
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
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Dự án</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={search.project}
                  label="Dự án"
                  onChange={(event: SelectChangeEvent) => {
                    let project = event.target.value.toString()
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        project: project,
                      })
                    }
                  }}
                >
                  {projects.map((project) => {
                    return (
                      <MenuItem key={project.value} value={project.value}>
                        {project.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Số phòng ngủ</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={
                    search.bedroom?.min == ""
                      ? ""
                      : search.bedroom?.min + "-" + search.bedroom?.max
                  }
                  label="Số phòng ngủ"
                  onChange={(event: SelectChangeEvent) => {
                    let bedroomRange = event.target.value.toString().split("-")
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        bedroom: {
                          min: bedroomRange[0],
                          max: bedroomRange[1],
                        },
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
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
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
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Đường rộng</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={
                    search.streetWidth?.min == ""
                      ? ""
                      : search.streetWidth?.min + "-" + search.streetWidth?.max
                  }
                  label="Đường rộng"
                  onChange={(event: SelectChangeEvent) => {
                    let streetWidthRange = event.target.value
                      .toString()
                      .split("-")
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        streetWidth: {
                          min: streetWidthRange[0],
                          max: streetWidthRange[1],
                        },
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
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <FormControl fullWidth size="small">
                <InputLabel id="label-input-ward">Mặt tiền</InputLabel>
                <Select
                  labelId="label-input-street"
                  id="input-ward"
                  value={
                    search.width?.min == ""
                      ? ""
                      : search.width?.min + "-" + search.width?.max
                  }
                  label="Mặt tiền"
                  onChange={(event: SelectChangeEvent) => {
                    let widthRange = event.target.value.toString().split("-")
                    if (search != undefined) {
                      setSearch({
                        ...search,
                        width: {
                          min: widthRange[0],
                          max: widthRange[1],
                        },
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

export default SearchBar
