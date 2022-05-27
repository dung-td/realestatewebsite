import { useState, useEffect, Fragment, MouseEvent, KeyboardEvent } from "react"
import Swal from "sweetalert2"
import Chip from "@mui/material/Chip"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import Image from "next/image"
import Modal from "@mui/material/Modal"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import PostContent from "../../components/EstateDetail/PostContent"
import moment from "moment"

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 2,
}

const Item: React.FC<{ data: any; callback: any }> = ({ data, callback }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [expandDetail, setExpandDetail] = useState(false)
  const [previewDrawler, setPreviewDrawler] = useState(false)

  const [postDuration, setPostDuration] = useState(0)
  const post_durations = ["7", "10", "14", "21"]

  const Swal = require("sweetalert2")

  const expand = () => {
    setExpandDetail(!expandDetail)
  }

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return
      }
      setPreviewDrawler(open)
    }

  const deletePost = () => {
    Swal.fire({
      title: "Xóa bài viết?",
      text: "Bài viết đã xóa không thể khôi phục!\nBạn có thể chuyển vào bài viết nháp",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      denyButtonColor: "#46B2E0",
      confirmButtonColor: "#B4161B",
      cancelButtonColor: "#3085d6",
      denyButtonText: "Chuyển vào tin nháp",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Call delete function
        callback(data._id, "delete")
      } else if (result.isDenied) {
        callback(data._id, "draft")
      }
    })
  }

  return (
    <div className="mb-4 p-4 grid grid-cols-12 bg-white rounded-lg border border-gray-200 shadow-md gap-4">
      <div className="col-span-12 md:col-span-3 lg:col-span-3">
        <Image
          alt={data.title}
          className="rounded-lg"
          src={data.images[0]}
          width={600}
          height={400}
        />
      </div>
      <div className="col-span-12 md:col-span-9">
        <a href="#" className="text-xl font-bold text-gray-700">
          {data.title}
        </a>
        <p className="text-gray-700">
          <span className="font-semibold">{data.estateType.name}</span> -{" "}
          {data.address}
        </p>
        <div className="grid grid-cols-4 gap-4 mt-6 w-full">
          <div className="col-span-2">
            <p>Trạng thái</p>
            {data.status == "approved" ? (
              <Chip label="Đã duyệt" color="success" />
            ) : data.status == "waiting" ? (
              <Chip label="Chờ duyệt" color="warning" />
            ) : (
              <Chip label="Chờ xử lý" color="error" />
            )}
          </div>
          <div className="col-span-2">
            <p>Mã tin</p>
            <p className="font-bold">{data._id}</p>
          </div>
          <div className="col-span-2">
            <p>Ngày đăng</p>
            <p className="font-bold">{data.publishedDate}</p>
          </div>
          <div className="col-span-2">
            <p>Ngày hết hạn</p>
            <p className="font-bold">{data.expiredDate}</p>
          </div>
        </div>
      </div>

      {data.status == "approved" ? (
        <div className="col-span-12 md:col-span-4 mt-4"></div>
      ) : (
        <div className="col-span-12 md:col-span-6 mt-4"></div>
      )}

      <div
        className={`w-full col-span-12 ${
          data.status == "approved" ? "md:col-span-8" : "md:col-span-6"
        } mt-4 grid grid-cols-5 gap-1`}
      >
        {data.status == "approved" ? (
          <>
            <div className="col-span-4 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={toggleDrawer(true)}
              >
                Chi tiết
              </button>
            </div>

            {data.status == "approved" ? (
              <div className="col-span-4 md:col-span-1">
                <button
                  type="button"
                  className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Chỉnh sửa
                </button>
              </div>
            ) : null}

            <div className="col-span-2 md:col-span-1">
              <a
                href={
                  data.forSaleOrRent == "sale"
                    ? `ban-${data.estateType.slug}/${data.slug}`
                    : `thue-${data.estateType.slug}/${data.slug}`
                }
                type="button"
                target="_blank"
                rel="noreferrer"
                className="w-full cursor-pointer text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Xem tin
              </a>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  setModalOpen(true)
                }}
              >
                Gia hạn
              </button>
            </div>
          </>
        ) : data.status == "waiting" ? (
          <>
            <div className="col-span-4 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={toggleDrawer(true)}
              >
                Chi tiết
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chỉnh sửa
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-white bg-red-700 hover:bg-red-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={deletePost}
              >
                Xóa bài
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-4 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={toggleDrawer(true)}
              >
                Chi tiết
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chỉnh sửa
              </button>
            </div>

            <div className="col-span-2 md:col-span-1">
              <button
                type="button"
                className="w-full text-white bg-red-700 hover:bg-red-800 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Xóa bài
              </button>
            </div>
          </>
        )}

        <div className="col-span-4 md:col-span-1">
          <button
            onClick={expand}
            className="center text-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Mở rộng
            <span className="material-icons">arrow_drop_down</span>
          </button>
        </div>
      </div>

      {expandDetail ? (
        data.status == "approved" ? (
          <>
            <p className="col-span-12 text-center font-bold text-md">
              THỐNG KÊ
            </p>
            <div className="col-span-6 font-medium">
              Ngày duyệt bài: <span className="font-bold">22/02/2022</span>
            </div>
            <div className="col-span-6 font-medium">
              Lượt tiếp cận: <span className="font-bold">3004</span> lượt
            </div>
            <div className="col-span-6 font-medium">
              Lượt xem: <span className="font-bold">1975</span> lượt
            </div>

            <div className="col-span-6 font-medium">
              Lượt thao tác: <span className="font-bold">304</span> lượt
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
              >
                <p className="text-center">Chi tiết thống kê</p>
              </button>
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 mb-2"
              >
                <p className="text-center">Đẩy bài viết</p>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="col-span-12 text-center font-bold text-md">
              THÔNG TIN BÀI ĐĂNG
            </p>
            <div className="col-span-6 font-medium">
              Người đăng: <span className="font-bold">{data.owner.name}</span>
            </div>
            <div className="col-span-6 font-medium">
              Duyệt trước: <span className="font-bold">22/04/2022</span>
            </div>
            <div className="col-span-6 font-medium">
              Loại tin đăng:{" "}
              <span className="font-bold">{data.postType.name}</span>
            </div>
            <div className="col-span-6 font-medium">
              Loại tin đăng:{" "}
              <span className="font-bold">{data.postType.name}</span>
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <p className="text-center">Thay đổi gói tin đăng</p>
              </button>
            </div>
            <div className="col-span-12 md:col-span-6 font-medium">
              <button
                type="button"
                className="w-full justify-center text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <p className="text-center">Đẩy bài viết</p>
              </button>
            </div>
          </>
        )
      ) : null}

      <Fragment>
        <Drawer
          anchor="right"
          open={previewDrawler}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ minWidth: 500 }}
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className="max-w-2xl relative bg-white pb-12 flex flex-col">
              <div className="inline-flex items-center justify-center px-4 py-4 fixed bg-white z-10 w-[42rem]">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={toggleDrawer(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-strokeLinecap="round"
                      stroke-strokeLinejoin="round"
                      stroke-strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <p className="ml-auto mr-auto font-bold text-xl">
                  Thông tin xem trước
                </p>
              </div>

              <div className="px-4 pt-5 pb-2 flex">
                <PostContent post={data} />
              </div>
            </div>
          </Box>
        </Drawer>
      </Fragment>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div>
            <p className="text-center font-bold text-xl">Gia hạn tin đăng</p>
            <div className="grid grid-cols-2 mt-2 mb-4">
              <div>
                <p className="font-xl font-medium"> Ngày hết hạn hiện tại:</p>
              </div>
              <div>
                <p className="font-xl font-bold">{data.expiredDate}</p>
              </div>
            </div>

            <p className="font-xl font-medium">Chi tiết gia hạn:</p>
            <div className="post-type w-full h-max flex flex-col px-4">
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
                    value={moment("22/12/2022", "DD-MM-YYYY").format(
                      "YYYY-MM-DD"
                    )}
                    style={{ width: "98%" }}
                  />
                </div>
              </div>

              <div className="bg-blue-200 w-full h-40 py-1 px-3 mt-4 rounded-lg">
                <div className="flex flex-row justify-between mt-2 mt-2 mb-3">
                  <p className="text-black text-sm font-medium">
                    Loại tin đăng
                  </p>
                  <p className="text-black text-sm">
                    {/* {postTypes.length > 0 ? postTypes[postTypeIndex].name : ""} */}
                  </p>
                </div>

                <div className="flex flex-row justify-between mt-2 mb-3">
                  <p className="text-black text-sm font-medium">
                    Đơn giá / ngày
                  </p>
                  <p className="text-black text-sm">
                    {/* {postTypes.length > 0
                      ? MoneyFormat(postTypes[postTypeIndex].price)
                      : ""}{" "}
                    VNĐ */}
                  </p>
                </div>

                <div className="flex flex-row justify-between mt-2 mb-3">
                  <p className="text-black text-sm font-medium">Số ngày đăng</p>
                  <p className="text-black text-sm">
                    {/* {postDuration == 0 ? post_durations[0] : postDuration} */}
                  </p>
                </div>

                <hr className="border-1 border-solid border-black" />

                <div className="flex flex-row justify-between mt-2 mb-3">
                  <p className="text-black text-lg font-medium">Bạn trả</p>
                  <p className="text-black text-lg font-medium">
                    {/* {postTypes.length > 0
                      ? MoneyFormat(
                          postDuration == 0 && postTypeIndex == 0
                            ? postTypes[postTypeIndex].price *
                                parseInt(post_durations[0])
                            : postDuration * postTypes[postTypeIndex].price
                        )
                      : ""}{" "}
                    VNĐ */}
                  </p>
                </div>
              </div>
            </div>

            <div className="inline-flex justify-end w-full mt-4">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={() => {
                  setModalOpen(false)
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Item
