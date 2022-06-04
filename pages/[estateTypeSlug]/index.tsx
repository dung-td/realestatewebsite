import server from "../../interfaces/server"
import { Estate } from "../../interfaces/estate"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ListEstate from "../../components/Estate/ListEstate"
import { GetServerSideProps } from "next"

type Props = {
    posts: Estate[]
}

const ListPost = (props: Props) => {
    return (
        <>
            <Header/>

            {/* List posts */}
            <ListEstate posts={props.posts}/>

            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    var estateType = context.params?.estateTypeSlug
    var purpose = context.query?.pp
    purpose == "ban" ? (purpose  = "sale") : (purpose  = "rent")

    // Get EstateTypeID
    const estateTypes = await fetch(`${server}/a/estate-type/get`)
    let data = await estateTypes.json()
    data = data.data

    for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.slug == estateType) {
            estateType = element._id
            break
        }
    }

    // Get post with params
    let posts = new Array()
    const res = await fetch(`${server}/post/get?pp=${purpose}&et=${estateType}&stt=approved&limit=20`)
    data = await res.json()
    data = data.data

    data.forEach((post: any) => {
        let obj = {
            _id: post._id,
            title: post.title,
            address: post.address,
            estateType: post.estateType,
            thumbnail: post.images[0],
            price: post.price,
            priceType: post.priceType,
            area: post.area,
            bathroom: post.bathroomNumber,
            bedroom: post.bedroomNumber,
            ownerName: post.owner.name,
            ownerPhone: post.owner.phone,
            titleColor: post.postType.title_color,
            slug: post.slug,
            purpose: post.forSaleOrRent,
        }
        posts.push(obj)
    })

    return { props: { posts } }
}

export default ListPost