import { ClockIcon, HeartIcon, HomeIcon } from "@heroicons/react/outline"
import { Unit, getUnitComponent } from "../../Enum"
import PostDto from "../../interfaces/PostDTO"
import CollapseDescription from "./CollapseDescription"
import DetailBox from "./DetailBox"
import ImageCarousel from "./ImageCarousel"
import Map from "../Map"

const Separator: React.FC = () => {
  return <div className="my-3 border-b border-y-gray-300 container"></div>
}
interface IPost {
  post: PostDto
}

const PostContent = (props: IPost) => {
  const { post } = props
  const PriceComponent = () => {
    const price =
      post.price > 1000
        ? (Math.round((post.price / 1000) * 100) / 100).toString() + " tỷ"
        : post.price.toString() + " triệu"
    switch (post.priceType) {
      case "VNĐ":
        return <span>{`${price} đồng`}</span>
      case "Thỏa thuận":
        return <span>Thỏa thuận</span>
      default:
        return (
          <span>
            {price}/m<sup>2</sup>
          </span>
        )
    }
  }
  const RoomSection = () => {
    if (post.bathroomNumber == 0 && post.bedroomNumber == 0) return null
    const roomString =
      post.bathroomNumber > 0 && post.bedroomNumber > 0
        ? `${post.bedroomNumber} PN + ${post.bathroomNumber} PT`
        : post.bathroomNumber
        ? `${post.bathroomNumber} PT`
        : `${post.bedroomNumber} PN `
    console.log(roomString)
    return (
      <>
        <div className="flex-1">
          <p>Phòng</p>
          <p className="font-bold">{roomString}</p>
        </div>
      </>
    )
  }
  let detailList = [
    { name: "Diện tích", value: post.area, unit: Unit.AREA },
    { name: "Số tầng", value: post.floorNumber },
    { name: "Chiều ngang", value: post.width, unit: Unit.LENGTH },
    { name: "Chiều sâu", value: post.depth, unit: Unit.LENGTH },
    { name: "Số phòng ngủ", value: post.bedroomNumber },
    { name: "Số phòng tắm", value: post.bathroomNumber },
    { name: "Nội thất", value: post.furniture },
    { name: "Hướng nhà", value: post.direction },
    { name: "Giấy tờ pháp lý", value: post.legalDocuments },
  ]

  return (
    <div className="w-full">
      <ImageCarousel
        imageList={post.images}
        className="border-2xl overflow-clip rounded-lg"
      />
      <div className="p-3">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase">
            {post.title}
          </h1>
          {post.publishedDate && (
            <div className="mt-3 flex items-center ">
              <ClockIcon className="w-5 h-5 inline-block" />
              <span className="w-2"></span>
              {` Ngày đăng: ${post.publishedDate}`}
            </div>
          )}
          {post?.address && (
            <div className="mt-1 flex items-center">
              <HomeIcon className="w-5 h-5 inline-block" />
              <span className="w-2"></span>
              {`Địa chỉ: ${post.address}`}
            </div>
          )}
          <div className="my-3 border-b border-y-gray-300 container"></div>
        </div>
        <div className="flex justify-between">
          <div className="flex-1">
            <p>Mức giá</p>
            <p className="font-bold">{PriceComponent()}</p>
          </div>
          <div className="flex-1">
            <p>Diện tích</p>
            <p className="font-bold">
              {`${post.area} m`}
              <sup>2</sup>
            </p>
          </div>
          {RoomSection()}
          <div className="flex items-center justify-center">
            <span>
              <HeartIcon className="w-6 h-6 inline-block font-light" /> Lưu tin
            </span>
          </div>
        </div>
        <Separator />
        <h1 className="mt-3 font-bold">Thông tin mô tả</h1>
        <CollapseDescription>{post.description}</CollapseDescription>

        <div className="mt-3 font-bold">Đặc điểm bất động sản</div>
        <DetailBox
          estateType={post.estateType}
          address={post.address}
          attributeList={detailList.filter((element) => element.value)}
        />

        <Map lat={post.cor.lat} lng={post.cor.Lng} type="view" />
      </div>
    </div>
  )
}

export default PostContent
