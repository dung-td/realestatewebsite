import type { NextPage } from "next"
import { useState } from "react"

type Props = {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    price: string;
    areaSqr: string;
    rooms: string;
    address: string;
    author: string;
    author_phone_number: string;
}

const EstateCard = (props : Props) => {
    const [favourite, setFavourite] = useState(false);

    const handleFavouriteClick = (itemId: string) => {
        setFavourite(!favourite)
    }

    return (
        <div className="flex flex-row xl:flex-row h-max drop-shadow-md border-solid border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400">
            <div className="w-2/3 xl:max-h-72 aspect-w-1 aspect-h-1 bg-gray-200 rounded-tl-lg rounded-bl-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                    className="w-full h-full object-cover xl:max-h-72"
                    src={props.imageUrl}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                />
            </div>
            
            <div className="ml-4 w-8/12 mr-4">
                <h3 className="mt-2 text-black text-base font-bold">{props.title}</h3>
                <div className="pr-3 mt-2 flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <span className="material-icons-outlined">paid</span>
                        <p className="text-black text-sm ml-1">{props.price}</p>
                    </div>

                    <div className="flex flex-row items-center">
                        <span className="material-icons-outlined">
                        check_box_outline_blank
                        </span>
                        <p className="text-black text-sm ml-1">{props.areaSqr}</p>
                    </div>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <span className="material-icons-outlined">villa</span>
                    <p className="text-black text-sm ml-1">{props.category}</p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <span className="material-icons-outlined">door_sliding</span>
                    <p className="text-black text-sm ml-1">{props.rooms}</p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <span className="material-icons-outlined">navigation</span>
                    <p className="text-black text-sm ml-1">{props.address}</p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <p className="text-black text-sm font-bold">Đăng bởi: </p>
                    <p className="text-black text-sm ml-1">{props.author}</p>
                </div>
                <div className="flex flex-col items-center lg:flex-row mt-3 mb-3 justify-between">
                    <div className="w-4/5 md:w-9/12 border-solid border border-gray-300 rounded-lg px-2 py-1 flex flex-row justify-center items-center">
                        <span className="material-icons-outlined mr-2">phone</span>
                        <p className="text-black text-sm font-medium">{props.author_phone_number}</p>
                    </div>
                    <button
                        title={favourite ? 'Bỏ lưu' : 'Lưu'}
                        className={
                            !favourite ? 
                            "group mt-2 lg:mt-0 w-4/5 md:w-3/12 md:ml-2 border-solid border border-gray-300 rounded-lg px-2 py-1 flex items-center justify-center hover:border-rose-500"
                            : "group mt-2 lg:mt-0 w-4/5 md:w-3/12 md:ml-2 border-solid border border-rose-500 rounded-lg px-2 py-1 flex items-center justify-center hover:border-rose-300"
                        }
                        onClick={() => {
                            handleFavouriteClick(props.id)
                        }}
                    >
                        <span
                            className={
                                !favourite ?
                                "material-icons group-hover:text-rose-500"
                                : "material-icons text-rose-500 group-hover:text-rose-300"
                            }
                        >favorite_border</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EstateCard