import { useState } from "react"
import DKDKDrop1 from "./DKDKDrops"
import { DKDKDrop2, DKDKDrop3, DKDKDrop4, DKDKDrop5 } from "./DKDKDrops"

const DKDKList = () => {
    const [isShow1, setIsShow1] = useState(false)
    const [isShow2, setIsShow2] = useState(false)
    const [isShow3, setIsShow3] = useState(false)
    const [isShow4, setIsShow4] = useState(false)
    const [isShow5, setIsShow5] = useState(false)

    const handleClick1 = () => {
        setIsShow1(current => !current)
        console.log("isShow" + isShow1)
    }

    const handleClick2 = () => {
        setIsShow2(current => !current)
        console.log("isShow" + isShow2)
    }

    const handleClick3 = () => {
        setIsShow3(current => !current)
        console.log("isShow" + isShow3)
    }

    const handleClick4 = () => {
        setIsShow4(current => !current)
        console.log("isShow" + isShow4)
    }

    const handleClick5 = () => {
        setIsShow5(current => !current)
        console.log("isShow" + isShow5)
    }


    return (<div className="divide-y space-y-6">
        <h2 className="font-bold cursor-pointer" onClick={handleClick1}>I. QUY ĐỊNH CHUNG</h2>
        {isShow1 ? <DKDKDrop1 /> : <></>}
        <h2 className="font-bold cursor-pointer" onClick={handleClick2}>II. ĐIỀU KHOẢN GIAO DỊCH</h2>
        {isShow2 ? <DKDKDrop2 /> : <></>}
        <h2 className="font-bold cursor-pointer" onClick={handleClick3}>III. CHÍNH SÁCH BẢO MẬT</h2>
        {isShow3 ? <DKDKDrop3 /> : <></>}
        <h2 className="font-bold cursor-pointer" onClick={handleClick4}>IV. ĐIỀU KHOẢN SỬ DỤNG</h2>
        {isShow4 ? <DKDKDrop4 /> : <></>}
        <h2 className="font-bold cursor-pointer" onClick={handleClick5}>V. QUY CHẾ HOẠT ĐỘNG</h2>
        {isShow5 ? <DKDKDrop5 /> : <></>}
        <h2></h2>
    </div>)
}

export default DKDKList