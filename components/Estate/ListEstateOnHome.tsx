import Link from "next/link";
import CardOnHome from "./CardOnHome";

type Props = {
    posts: any[]
}

const ListEstateOnHome = (props: Props) => {

    return (
        <>
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
                                priceType={item.priceType}
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
                <Link href={`/tin-dang/`} passHref>
                    <button
                        className="w-28 h-9 border border-solid border-gray-300 rounded-lg hover:border-black"
                        title="Xem thêm"
                    >
                        <p className="text-xs font-medium">Xem thêm</p>
                    </button>
                </Link>
            </div>
        </>
    )
}

export default ListEstateOnHome