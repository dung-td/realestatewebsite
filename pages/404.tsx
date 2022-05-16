import Header from "../components/Header"
import Image from "next/image"
import errorPic from "../public/img/error.png"
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined"

export default function Custom404() {
  return (
    <div>
      <Header />

      <div className="grid mt-16">
        <div className="text-center">
          <Image alt="404" src={errorPic} height={150} width={300} />

          <div className="mt-4">
            <SentimentVeryDissatisfiedOutlinedIcon sx={{ fontSize: 40 }} />
          </div>

          <p className="font-bod text-2xl mt-4">
            Trang bạn đang tìm kiếm không tồn tại!
          </p>
          <a href="\" className="hover:underline hover:text-[#383CC1]">
            {" "}
            Trở về trang chủ
          </a>
        </div>
      </div>
    </div>
  )
}
