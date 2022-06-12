import OfficeCardComp from "./OfficeCard"

const VanPhongMienNamDrop = () => {
    return (
        <div className="flex space-x-4 pt-6">
            <OfficeCardComp name="Văn phòng đại diện Miền Nam" address="Số 3, Đường 3/2, Q. 10, TP. Hồ Chí Minh" phone="0909 090 090" />
            <OfficeCardComp name="Văn phòng đại diện Đồng Nai" address="Đường Nguyễn Khác Hiếu, Tổ 26, Khu Phố Long Đức 1, P. Tam Phước, TP. Biên Hòa, Đồng Nai" phone="0978.916.737" />
            {/* {OfficeCard("Văn phòng đại diện Miền Nam", "Số 3, Đường 3/2, Q. 10, TP. Hồ Chí Minh", "0909 090 090")}
            {OfficeCard("Văn phòng đại diện Đồng Nai", "Đường Nguyễn Khác Hiếu, Tổ 26, Khu Phố Long Đức 1, P. Tam Phước, TP. Biên Hòa, Đồng Nai", "0978.916.737")} */}
        </div>
    )
}

export default VanPhongMienNamDrop