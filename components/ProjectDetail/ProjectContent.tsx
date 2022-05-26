import { ClockIcon, HomeIcon } from "@heroicons/react/outline"
import { Unit, getUnitComponent } from "../../Enum"
import ProjectDto from "../../interfaces/ProjectDTO"
import DetailBox from "./DetailBox"
import ImageCarousel from "../EstateDetail/ImageCarousel"
import ContentSegment from "./ContentSegment"
import Map from "../Map"
import FavoriteButton from '../EstateDetail/FavoriteButton'
const Separator: React.FC = () => {
  return <div className="my-3 border-b border-y-gray-300 container"></div>
}
interface IProject {
  project: ProjectDto
}



const ProjectContent = (props: IProject) => {
  const { project } = props
  const { description, investor, utilities } = project
  console.log(project)
  const UtilityComponent = () => {
    return (<div className="border rounded-lg border-2xl border-gray-300 overflow-clip p-3 my-2">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 m-2 list-disc">
          {utilities.map((val, index) =>(
              <li className="container pb-2 mb-2 list-inside"  key={index}>
                  {val}
              </li>
          ))}
        </ul>
    </div>)
  }

let detailList = [
  { name: "Diện tích", value: project.area, unit: Unit.AREA },
  { name: "Số căn hộ", value: project.aparmentNumber },
  { name: "Giá", value: project.price, unit: Unit.PRICEPERMETER },
  { name: "Số tòa", value: project.buildingNumber },
  { name: "Thời điểm hoàn thành", value: project.estimatedCompletionTime },
  { name: "Mật độ xây dựng", value: project.density+'%' },
  { name: "Thời gian khởi công", value: project.estimatedStartTime },
  { name: "Giấy tờ pháp lý", value: project.legalDocuments },
]

  return (
    <div className="w-full">
      <ImageCarousel
        imageList={project.images}
        className="border-2xl overflow-clip rounded-lg"
      />
      <div className="p-3">
        <div>
          <h1 className="text-3xl font-bold text-black uppercase">
            {project.name}
          </h1>
          {project.publishedDate && (
            <div className="mt-3 flex items-center ">
              <ClockIcon className="w-5 h-5 inline-block" />
              <span className="w-2"></span>
              {` Ngày đăng: ${project.publishedDate}`}
            </div>
          )}
          {project.address && (
            <div className="mt-1 flex items-center">
              <HomeIcon className="w-5 h-5 inline-block" />
              <span className="w-2"></span>
              {`Địa chỉ: ${project.address}`}
            </div>
          )}
          <div className="my-3 border-b border-y-gray-300 container"></div>
        </div>
        <div className="flex justify-between">
          <div className="flex-1">
            <p>Mức giá</p>
            <p className="font-bold">{(Math.round((project.price / 1000) * 100) / 100).toString() + " tỷ"}</p>
          </div>
          <div className="flex-1">
            <p>Diện tích</p>
            <p className="font-bold">
              {`${project.area} m`}
              <sup>2</sup>
            </p>
          </div>
          <div className="flex-1">
            <p>Số căn hộ</p>
            <p className="font-bold">
                {`${project.aparmentNumber} căn`}
            </p>
          </div>          
          <div className="flex items-center justify-center">
            <span>
              {/* <HeartIcon className="w-6 h-6 inline-block font-light" /> */}
              <FavoriteButton onclick={()=>{}}/>
            </span>
          </div>
        </div>
        <Separator />
        <h1 className="mt-3 font-medium text-2xl ">Thông tin mô tả</h1>
            {
              description.map( val => <ContentSegment segment={val} key={val._id}/>)
            }
        <div className="mt-3 font-medium text-2xl">Thông tin chi tiết</div>
        <DetailBox
          projectType = { project.projectType }
          investorName = { investor.name }
          address = { project.address }
          attributeList = {detailList.filter((element) => element.value)}
        />
        <div className="mt-3 font-medium text-2xl">Tiện dụng</div>
        {UtilityComponent()}
        <Map lat={project.cor.lat} lng={project.cor.Lng} type="view" />
      </div>
    </div>
  )
}

export default ProjectContent
