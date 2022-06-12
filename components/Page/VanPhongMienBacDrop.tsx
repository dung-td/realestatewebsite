import OfficeCardComp from "./OfficeCard"

const VanPhongMienBacDrop = () => {
    return (
        <div className="flex space-x-4 pt-6">
            <div className="space-y-4">
                <OfficeCardComp name="Văn phòng đại diện Thái Bình" address="Đường Đê Bờ Sông Trà Lý, Tổ 7 Hoàng Diệu" phone="0968 592 468" />
                <OfficeCardComp name="Văn phòng đại diện Hòa Bình" address="Số Nhà 446, Tiểu Khu 6, Thị Trấn Lương Sơn, Tỉnh Hòa Bình" phone="0963.932.368" />
                <OfficeCardComp name="Văn phòng đại diện Hải Dương" address="Số 118 Thanh Bình, P. Thanh Bình, TP. Hải Dương" phone="0936.707.379" />
                <OfficeCardComp name="Văn phòng đại diện Sơn Tây" address="Số 54, tổ dân phố 2, đường Trung Sơn Trầm, Thị xã Sơn Tây, Hà Nội" phone="0977.098.666" />
                <OfficeCardComp name="Văn phòng đại diện Bắc Giang" address="Trung tâm VHTT người cao tuổi Tỉnh Bắc Giang, Đường Lý Tự Trọng, P. Xương Giang, TP. Bắc Giang" phone="0987.290.969" />
                <OfficeCardComp name="Văn phòng đại diện Phú Thọ" address="Số 02, Ngõ 06 Đường Hùng Quốc Vương, Khu tái định cư Đồng Gia, P. Minh Nông, TP. Việt Trì, Tỉnh Phú Thọ" phone="0983.374.185" />
            </div>
            <div className="space-y-4">
                <OfficeCardComp name="Văn phòng đại diện Hải Phòng" address="Số nhà 569 Đường 208 An Đồng, An Dương, Hải Phòng" phone="0976 316 929" />
                <OfficeCardComp name="Văn phòng đại diện Bắc Ninh" address="Lô 13 Tòa thương mại Cát Tường ECO - Đường Lê Thái Tổ - P. Võ Cường - TP.Bắc Ninh" phone="0985.156.668" />
                <OfficeCardComp name="Văn phòng đại diện Hưng Yên" address="Số 97 Phạm Ngũ Lão, Ân Thi, Hưng Yên" phone="0357.351.888" />
                <OfficeCardComp name="Văn phòng đại diện Nam Định" address="Nhà Hàng Mai Anh, Tổ 18 Thị Trấn Xuân Trường, Nam Định" phone="0913.769.339" />
                <OfficeCardComp name="Văn phòng đại diện Vĩnh Phúc" address="Số 2, Lô 3, Khu đô thị Chùa Hà Tiên, TP. Vĩnh Yên, Tỉnh Vĩnh Phúc" phone="0966.833.908" />
            </div>
        </div>
    )
}

export default VanPhongMienBacDrop