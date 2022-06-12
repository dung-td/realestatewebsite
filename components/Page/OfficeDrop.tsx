import { useState } from "react"
import { ArrowDropDown } from "@mui/icons-material"
import VanPhongMienBacDrop from "./VanPhongMienBacDrop"
import VanPhongMienNamDrop from "./VanPhongMienNamDrop"

const OfficeDrop = () => {
    const [isShowVPMB, setIsShowVPMB] = useState(false)
    const [isShowVPMN, setIsShowVPMN] = useState(false)

    const handleClickVPMB = () => {
        setIsShowVPMB(current => !current)

        console.log("isShowVPMB=" + isShowVPMB)
    }

    const handleClickVPMN = () => {
        setIsShowVPMN(current => !current)

        console.log("isShowVPMN=" + isShowVPMN)
    }

    return (<div className="text-md space-y-6 divide-y h-auto">
        <div className="cursor-pointer font-bold" onClick={handleClickVPMB}>VĂN PHÒNG MIỀN BẮC<ArrowDropDown className="absolute right-48" /></div>
        {isShowVPMB ? <VanPhongMienBacDrop /> : <></>}
        <div className="cursor-pointer font-bold" onClick={handleClickVPMN}>VĂN PHÒNG MIỀN NAM<ArrowDropDown className="absolute right-48" /></div>
        {isShowVPMN ? <VanPhongMienNamDrop /> : <></>}
    </div>)
}

export default OfficeDrop