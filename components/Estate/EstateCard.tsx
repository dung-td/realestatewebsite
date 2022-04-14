import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

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
    const { 
        id,
        title,
        imageUrl,
        category,
        price,
        areaSqr,
        rooms,
        address,
        author,
        author_phone_number 
    } = props;

    return (
        <a href="#" className="group flex flex-row h-max border-solid border border-gray-200 rounded-lg hover:border-gray-400">
            <div className="w-2/3 aspect-w-1 aspect-h-1 bg-gray-200 rounded-tl-lg rounded-bl-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                    className="w-full h-full object-cover max-h-96 xl:max-h-72"
                    src={imageUrl}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                />
            </div>
            
            <div className="ml-4 w-8/12 mr-4">
                <h3 className="mt-2 text-black font-bold">{title}</h3>
                <div className="pr-3 mt-2 flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <span className="material-icons-outlined">paid</span>
                        <p className="text-black ml-1">{price}</p>
                    </div>

                    <div className="flex flex-row items-center">
                        <span className="material-icons-outlined">
                        check_box_outline_blank
                        </span>
                        <p className="text-black ml-1">{areaSqr}</p>
                    </div>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <span className="material-icons-outlined">villa</span>
                    <p className="text-black ml-1">{category}</p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <span className="material-icons-outlined">door_sliding</span>
                    <p className="text-black ml-1">{rooms}</p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <span className="material-icons-outlined">navigation</span>
                    <p className="text-black ml-1">{address}</p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                    <p className="text-black font-bold">Đăng bởi: </p>
                    <p className="text-black ml-1">{author}</p>
                </div>
                <div className="flex flex-col items-center lg:flex-row mt-2 mb-2 justify-between">
                    <div className="w-4/5 md:w-9/12 border-solid border border-gray-300 rounded-lg px-2 py-1 flex flex-row justify-center items-center">
                        <span className="material-icons-outlined mr-2">phone</span>
                        <p className="text-black font-bold">{author_phone_number}</p>
                    </div>
                    <a href="https://www.google.com" className="mt-1 lg:mt-0 w-4/5 md:w-3/12 md:ml-2 border-solid border border-gray-300 rounded-lg px-2 py-1 flex items-center justify-center hover:border-rose-500">
                        <span className="material-icons hover:text-rose-500">favorite_border</span>
                    </a>
                </div>
            </div>
        </a>
    )
}

export default EstateCard