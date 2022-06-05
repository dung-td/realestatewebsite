import type { NextPage } from "next"
import Link from "next/link";
import { useState } from "react"
import MoneyFormat from "../../util/MoneyFormat";

type Props = {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    areaSqr: string;
    address: string;
    projectStatus: string;
    titleColor: string;
    slug: string;
    projectType: {
        name: string;
        slug: string;
    };
}

const ProjectOnHome = (props : Props) => {

    const estateSlug = props.projectType.slug
    const postSlug = props.slug

    const convertPriceToString = (val: string) => {
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

        const price = length > 6 ? Math.round(parseInt(val) / dividedBy) : MoneyFormat(parseInt(val))

        return price.toString() + " " + resUnit + "/m2"
    }

    const getProjectStatus = (val: string) => {
        var res = ""
        switch (val) {
            case "open":
                res = "Đang mở bán"
                break
            case "finish":
                res = "Đã bàn giao"
                break
            default:
                res = "Sắp mở bán"
        }

        return res
    }

    const StatusDiv = () => {
        return (
            <>
            {
                props.projectStatus == "open" ?
                <div className={`mt-2 w-1/2 mx-auto py-1 items-center text-center rounded-md bg-[#E7FFF4]`}>
                    <p className={`text-[#006D3C] text-sm font-medium`}>{getProjectStatus(props.projectStatus)}</p>
                </div>
                : null
            }
            {
                props.projectStatus == "finish" ?
                <div className={`mt-2 w-1/2 mx-auto py-1 items-center text-center rounded-md bg-[#F0EAF4]`}>
                    <p className={`text-[#563968] text-sm font-medium`}>{getProjectStatus(props.projectStatus)}</p>
                </div>
                : null
            }
            {
                props.projectStatus == "pre-open" ?
                <div className={`mt-2 w-1/2 mx-auto py-1 items-center text-center rounded-md bg-[#FFECEB]`}>
                    <p className={`text-[#961B12] text-sm font-medium`}>{getProjectStatus(props.projectStatus)}</p>
                </div>
                : null
            }
            </>
        )
    }

    return (
        <Link href={`/du-an/${postSlug}`}>
            <a className="group flex flex-col h-max mt-2 ml-2 drop-shadow-md border-solid border border-gray-200 rounded-lg cursor-pointer">
                <div className="w-full max-h-48 aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                        className="w-full h-40 max-h-48 object-cover transition group-hover:-translate-y-1 group-hover:scale-110 duration-300"
                        src={props.imageUrl}
                        style={{imageRendering: '-webkit-optimize-contrast'}}
                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    />
                </div>
                
                <div className="w-full flex flex-col px-4 py-2">
                    <h3
                        className="text-black text-sm font-bold"
                        style={{
                            textOverflow: 'ellipsis',
                            display: 'block',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            maxHeight: '3em',
                            lineHeight: '1.5em',
                            color: props.titleColor
                        }}
                    >
                        {props.name}
                    </h3>

                    <div className="mt-2 flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                            <span className="material-icons-outlined text-[20px]">paid</span>
                            <p className="text-black text-sm ml-1">
                                {
                                    convertPriceToString(props.price)
                                }
                            </p>
                        </div>

                        <div className="flex flex-row items-center">
                            <span className="material-icons-outlined text-[20px]">
                            check_box_outline_blank
                            </span>
                            <p className="text-black text-sm ml-1">{props.areaSqr} m²</p>
                        </div>
                    </div>

                    <div className="flex flex-row mt-2 items-center">
                        <span className="material-icons-outlined text-[20px]">navigation</span>
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

                    <hr className="mt-2"/>

                    <StatusDiv/>
                </div>
            </a>
        </Link>
    )
}

export default ProjectOnHome