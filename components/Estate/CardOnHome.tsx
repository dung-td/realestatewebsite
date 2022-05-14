import type { NextPage } from "next"
import { useState } from "react"

type Props = {
    id: string;
    title: string;
    imageUrl: string;
    price: string;
    areaSqr: string;
    address: string;
    author: string;
    upload_date: string;
    titleColor: string;
}

const CardOnHome = (props : Props) => {
    const [favourite, setFavourite] = useState(false);

    const handleFavouriteClick = (itemId: string) => {
        setFavourite(!favourite)
    }

    return (
        <div className="group flex flex-col h-max mt-2 ml-2 drop-shadow-md border-solid border border-gray-200 rounded-lg cursor-pointer hover:opacity-90">
            <div className="w-full max-h-48 aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                    className="w-full h-40 max-h-48 object-cover transition group-hover:-translate-y-1 group-hover:scale-110 duration-300"
                    src={props.imageUrl}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                />

                <span
                    title={favourite ? 'Bỏ lưu' : 'Lưu'}
                    className={
                        !favourite ?
                        "material-icons absolute top-2 right-2 rounded-md p-1 text-white hover:bg-gray-200 hover:text-gray-700"
                        : "material-icons absolute top-2 right-2 rounded-md p-1 text-rose-500 hover:bg-gray-200"
                    }
                    onClick={() => handleFavouriteClick(props.id)}
                >favorite_border</span>
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
                    {props.title}
                </h3>

                <div className="mt-2 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                        <span className="material-icons-outlined text-[20px]">paid</span>
                        <p className="text-black text-sm ml-1">{props.price}</p>
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

                <div className="mt-2 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                        <span className="material-icons-outlined text-[20px]">schedule</span>
                        <p className="text-black text-sm ml-1">{props.upload_date}</p>
                    </div>

                    <p className="text-black text-sm font-bold">{props.author}</p>
                </div>
            </div>
        </div>
    )
}

export default CardOnHome