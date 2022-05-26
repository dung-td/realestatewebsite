import Link from "next/link";
import CardOnHome from "./CardOnHome";

type Props = {
    posts: any[]
}

const ListEstateOnHome = (props: Props) => {

    return (
        <>
            <div className="bg-white w-full">
                <div className="mx-auto py-8 px-4 max-w-full" style={{maxWidth: '1200'}}>
                    <div className="grid">
                        <h2 className="font-bold mb-4">BẤT ĐỘNG SẢN DÀNH CHO BẠN</h2>
                        <hr className="w-1/3 ml:0 -mt-3 mb-4 border-black"/>
                    </div>
                
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6">
                        {
                            props.posts.map((item) => {
                                return (
                                    <CardOnHome
                                        key={item._id}
                                        id={item._id}
                                        title={item.title}
                                        purpose={item.purpose}
                                        imageUrl={item.thumbnail}
                                        price={item.price}
                                        areaSqr={item.area}
                                        address={item.address}
                                        author={item.ownerName}
                                        upload_date={item.publishDate}
                                        titleColor={item.titleColor}
                                        estateType={item.estateType}
                                        slug={item.slug}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="my-4 text-center">
                        <Link href={`/post/list-post`}>
                            <button
                                className="w-28 h-9 border border-solid border-gray-300 rounded-lg hover:border-black"
                                title="Xem thêm"
                            >
                                <p className="text-xs font-medium">Xem thêm</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListEstateOnHome