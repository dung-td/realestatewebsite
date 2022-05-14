export type PostCard = {
    _id: string
    title: string
    address: string
    estateType: {
        _id: string
        name: string
    }
    thumbnail: string
    price: number
    area: number
    bathroom: number
    bedroom: number
    ownerId: string
}