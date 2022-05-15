import Header from "../components/Header"
import Image from "next/image"
import errorPic from "../public/img/error.png"

export default function Custom404() {
  return (
    <div>
      <Header />

      <div className="grid mt-16">
        <div className="text-center">
          <Image alt="404" src={errorPic} height={150} width={300} />
          <p className="font-bod text-2xl mt-4">
            {" "}
            Trang bạn đang tìm kiếm không còn tồn tại!
          </p>
          <a href="\"> Trở về trang chủ</a>
        </div>
      </div>
    </div>
  )
}
