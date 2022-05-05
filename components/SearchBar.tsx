import { NextPage, GetServerSideProps } from "next"
import React, { useState, Component, useEffect } from "react"
import Script from "next/script"
import Head from "next/head"
import Select from "react-select"
import { Province } from "../interfaces/Province"

type Props = {
  provinces: Province[]
}

type Search = {
  province?: string
  district?: string
  ward?: string
  street?: string
}

const SearchBar = ({ provinces }: Props) => {
  const [SearchExpand, setSearchExpand] = useState(false)

  const [districts, setDistrics] = useState(new Array())
  const [wards, setWards] = useState(new Array())
  const [streets, setStreets] = useState(new Array())

  let search: Search = {
    province: "",
    district: "",
    ward: "",
    street: "",
  }

  const onSearch = () => {
    console.log(search)
  }

  const onProvinceChange = (provinceId: string | undefined) => {
    if (search != undefined && provinceId != undefined) {
      search.province = provinceId
      console.log(search)
    }
  }

  const onDistrictChange = (districtId: string | undefined) => {
    if (search != undefined && districtId != undefined) {
      search.district = districtId
    }
  }

  const onWardChange = (wardId: string) => {
    if (search != undefined) {
      search.ward = wardId
    }
  }

  const onStreetChange = (streetId: string) => {
    if (search != undefined) {
      search.street = streetId
    }
  }

  const fetchDistrict = async (provinceId: string | undefined) => {
    if (provinceId !== undefined) {
      fetch(`http://localhost:3031/api/a/district/get?p=${provinceId}`)
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
      fetch(`http://localhost:3031/api/a/ward/get?d=${districtId}`)
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
      fetch(`http://localhost:3031/api/a/street/get?d=${districtId}`)
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
    <div className="grid bg-white rounded-md">
      <div className="hidden-md md:visible md:mb-4 border-b border-gray-200">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-1 md:p-4 rounded-t-lg border-b-2"
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Nhà đất cho thuê
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-1 md:p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Nhà đất bán
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-1 md:p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="settings-tab"
              data-tabs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Sang nhượng
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-1 md:p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="contacts-tab"
              data-tabs-target="#contacts"
              type="button"
              role="tab"
              aria-controls="contacts"
              aria-selected="false"
            >
              Dự án
            </button>
          </li>
        </ul>
      </div>

      <div id="myTabContent">
        {/* Profile */}
        <div
          className="md:p-6"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 mt-2 mb-1 md:mb-0 md:mt-0 border-gray-200 unhidden-md">
              <button
                id="dropdownTypeSearch"
                data-dropdown-toggle="dropdown"
                className="justify-center w-full inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                type="button"
              >
                <p className="text-xs sm:text-sm md:text-base">Nhà cho thuê</p>
                <span className="material-icons">arrow_drop_down</span>
              </button>
            </div>
            <div className="col-span-6 mt-2 mb-1 md:mb-0 md:mt-0 lg:col-span-2">
              <button
                id="dropdownTypeSearch"
                data-dropdown-toggle="dropdown"
                className="text-white w-full h-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                <span className="material-icons mr-2">home</span>
                <p className="text-xs md:text-sm xl:text-base">Loại nhà đất</p>
                <span className="material-icons">arrow_drop_down</span>
              </button>
            </div>
            <div className="relative col-span-12 sm:col-span-9 lg:col-span-8 ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-icons">search</span>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-full w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bạn tìm kiếm gì hôm nay?"
              />
            </div>
            <div className="col-span-12 lg:col-span-2 sm:col-span-12">
              <button
                type="button"
                className="text-white h-full w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={onSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-4 sm:p-8">
            <div
              key={"city"}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
            >
              <Select
                className="text-gray-900"
                placeholder={"Tỉnh/ thành phố"}
                options={provinces}
                onChange={(value) => {
                  onProvinceChange(value?.value)
                  fetchDistrict(value?.value)
                }}
              />
            </div>
            {[
              ["attach_money", "Khoảng giá"],
              ["crop_square", "Diện tích"],
            ].map(([icon, title]) => (
              <div
                key={title}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                <Select
                  className="text-gray-900"
                  placeholder={title}
                  isSearchable={false}
                  // options={provinces}
                />

                {/* <button
                  id="dropdownTypeSearch"
                  data-dropdown-toggle="dropdown"
                  className="justify-center w-full inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="material-icons mr-2 text-sm sm:text-base md:text-xl">
                    {icon}
                  </span>
                  <p className="text-xs sm:text-sm md:text-base">{title}</p>
                  <span className="material-icons">arrow_drop_down</span>
                </button> */}
              </div>
            ))}

            <div className="inline-flex justify-center items-center col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <button
                id="dropdownTypeSearch"
                className="justify-center text-blue-700 text-base font-medium w-full inline-flex items-center bg-white focus:outline-none hover:bg-gray-100 rounded-lg text-sm px-5 py-2.5"
                type="button"
                onClick={expandSearch}
              >
                <p>Mở rộng tìm kiếm</p>
                <span className="material-icons">arrow_drop_down</span>
              </button>
            </div>
          </div>

          {SearchExpand ? (
            <div className=" grid grid-cols-12 gap-4 mt-4 sm:p-8">
              <div
                key={"district"}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                <Select
                  placeholder="Quận/ huyện/ thành phố"
                  options={districts}
                  onChange={(value) => {
                    onDistrictChange(value?.value)
                    fetchWard(value?.value)
                    fetchStreet(value?.value)
                  }}
                />
              </div>
              <div
                key={"ward"}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                <Select
                  placeholder="Xã/ phường/ thị trấn"
                  options={wards}
                  onChange={(value) => {
                    onWardChange(value.value)
                  }}
                />
              </div>
              <div
                key={"road"}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                <Select
                  placeholder="Đường/ phố"
                  options={streets}
                  onChange={(value) => {
                    onStreetChange(value.value)
                  }}
                />
              </div>
              {[
                "Dự án",
                "Số phòng ngủ",
                "Hướng nhà",
                "Đường rộng",
                "Mặt tiền",
              ].map((title) => (
                <div
                  key={title}
                  className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
                >
                  <Select
                    placeholder={title}
                    isSearchable={false}
                    // options={provinces}
                  />
                  {/* <button
                    id="dropdownTypeSearch"
                    className="justify-center w-full inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <p className="text-xs sm:text-sm md:text-base">{title}</p>
                    <span className="material-icons">arrow_drop_down</span>
                  </button> */}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://provinces.open-api.vn/api/?depth=2`)
  const data = await res.json()
  let provinces = new Array()
  data.forEach((province: any) => {
    let obj = { value: province.code, label: province.name }
    provinces.push(obj)
  })

  // Pass data to the page via props
  return { props: { provinces } }
}

export default SearchBar
