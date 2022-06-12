import Link from "next/link"
import ProjectOnHome from "./ProjectOnHome"

type Props = {
    posts: any[]
}

const ListProjectOnHome = (props: Props) => {

    return (
        <>
            


            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6">
                        {
                            props.posts.map((item) => {
                                return (
                                    <ProjectOnHome
                                        key={item._id}
                                        id={item._id}
                                        name={item.name}
                                        imageUrl={item.thumbnail}
                                        price={item.price}
                                        areaSqr={item.area}
                                        address={item.address}
                                        projectStatus={item.projectStatus}
                                        titleColor={item.titleColor}
                                        projectType={item.projectType}
                                        slug={item.slug}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="my-4 text-center">
                        <Link href={`/tin-dang/du-an`}>
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

export default ListProjectOnHome