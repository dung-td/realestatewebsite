import type { NextPage } from "next"
import Link from "next/link";
import { useEffect, useState } from "react"
import MoneyFormat from "../../util/MoneyFormat";

type Props = {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    areaSqr: string;
    buildings: string;
    apartments: string;
    address: string;
    investor: string;
    slug: string;
    statusCode: string;
    titleColor: string;
    projectType: {
        name: string;
        slug: string;
    }
}

const ProjectCard = (props : Props) => {
    const [isLogin, setIsLogin] = useState(false)
    const [favourite, setFavourite] = useState(false)

    const projectSlug = props.projectType.slug
    const postSlug = props.slug

    const handleFavouriteClick = (e: any, itemId: string) => {
        setFavourite(!favourite)
        e.preventDefault()
    }

    const getStatusLabel = (val: string) => {
        var label = ""
        switch (val) {
            case "open":
                label = "Đang mở bán"
                break
            case "pre-open":
                label = "Sắp mở bán"
                break
            default:
                label = "Đã bàn giao"
        }
        return label
    }

    const getStatusColor = () => {
        var color = ""
        switch (props.statusCode) {
            case "open":
                color = "#006D3C"
                break
            case "pre-open":
                color = "#961B12"
                break
            default:
                color = "#563968"
        }
        return color
    }

    const getStatusDivBgColor = () => {
        var color = ""
        switch (props.statusCode) {
            case "open":
                color = "#E7FFF4"
                break
            case "pre-open":
                color = "#FFECEB"
                break
            default:
                color = "#F0EAF4"
        }
        return color
    }

    const convertPriceToString = (val: number) => {
        var resUnit = "VNĐ"
        var length = val.toString().length
        var dividedBy = 1

        if (length > 6 && length < 10) {
            resUnit = "triệu"
            dividedBy = 1000000
        }
        if (length > 9) {
            resUnit = "tỷ"
            dividedBy = 1000000000
        }

        const price = length > 6 ? Math.round(val / dividedBy) : MoneyFormat(val)

        return price.toString() + " " + resUnit + "/m2"
    }

    useEffect(() => {
        if (sessionStorage.getItem("jwt")) {
            setIsLogin(true)
        }
    }, [])

    return (
        <Link href={`/du-an/${postSlug}`}>
            <a className="group flex flex-row xl:flex-row h-max min-h-[264px] drop-shadow-md border-solid border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400">
                <div className="w-3/5 xl:max-h-72 aspect-w-1 aspect-h-1 bg-gray-200 rounded-tl-lg rounded-bl-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                        className="w-full h-full object-cover xl:max-h-72 transition group-hover:-translate-y-1 group-hover:scale-110 duration-300"
                        src={props.imageUrl}
                        style={{imageRendering: '-webkit-optimize-contrast'}}
                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    />
                </div>
                
                <div className="ml-4 w-8/12 mr-4">
                    <h3
                        className="mt-2 text-black text-sm font-bold uppercase"
                        style={{
                            textOverflow: 'ellipsis',
                            display: 'block',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            maxHeight: '1.5em',
                            lineHeight: '1.5em',
                            color: props.titleColor
                        }}
                    >
                        {props.name}
                    </h3>
                    <div className="pr-3 mt-2 flex flex-row justify-between">
                        <div className="flex flex-row items-center">
                            <span className="material-icons-outlined">paid</span>
                            <p className="text-black text-sm ml-1">{convertPriceToString(parseInt(props.price))}</p>
                        </div>

                        <div className="hidden lg:flex flex-row items-center">
                            <span className="material-icons-outlined">
                            check_box_outline_blank
                            </span>
                            <p className="text-black text-sm ml-1">{props.areaSqr} m²</p>
                        </div>
                    </div>
                    <div className="flex flex-row mt-2 items-center">
                        <span className="material-icons-outlined">villa</span>
                        <p className="text-black text-sm ml-1">{props.projectType.name}</p>
                    </div>
                    <div className="flex flex-row mt-2 items-center">
                        <span className="material-icons-outlined">door_sliding</span>
                        <p className="text-black text-sm ml-1">{props.buildings} tòa nhà</p>
                    </div>
                    <div className="flex flex-row mt-2 items-center">
                        <span className="material-icons-outlined">navigation</span>
                        <p
                            className="text-black text-sm ml-1"
                            style={{
                                textOverflow: 'ellipsis',
                                display: 'block',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                                maxHeight: '3em',
                                lineHeight: '1.5em'
                            }}
                        >
                            {props.address}
                        </p>
                    </div>
                    <div className="flex flex-row mt-2 items-center">
                        <p
                            className="text-black text-sm font-medium"
                            style={{
                                textOverflow: 'ellipsis',
                                display: 'block',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                                maxHeight: '3em',
                                lineHeight: '1.5em',
                                color: '#000'
                            }}
                        >
                            Chủ đầu tư: {props.investor}
                        </p>
                    </div>
                    <div className="group flex flex-col items-center lg:flex-row mt-3 mb-3 justify-between">
                        <div className={`w-4/5 md:w-full h-[34px] bg-[${getStatusDivBgColor()}] border-solid border border-gray-300 rounded-lg px-2 py-1 flex flex-row justify-center items-center`}>
                            <p className={`text-[${getStatusColor()}] text-sm font-medium`}>{getStatusLabel(props.statusCode)}</p>
                        </div>
                        {
                            isLogin ?
                            <div
                                title={favourite ? 'Bỏ lưu' : 'Lưu'}
                                className={
                                    !favourite ? 
                                    "mt-2 lg:mt-0 w-4/5 md:w-3/12 md:ml-2 border-solid border border-gray-300 rounded-lg px-2 py-1 flex items-center justify-center hover:bg-gray-100"
                                    : "mt-2 lg:mt-0 w-4/5 md:w-3/12 md:ml-2 border-solid border border-rose-500 rounded-lg px-2 py-1 flex items-center justify-center hover:bg-gray-100"
                                }
                                onClick={(e) => {
                                    handleFavouriteClick(e, props.id)
                                }}
                            >
                                <span
                                    className={
                                        !favourite ?
                                        "material-icons"
                                        : "material-icons text-rose-500"
                                    }
                                >favorite_border</span>
                            </div>
                            : null
                        }
                        
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ProjectCard