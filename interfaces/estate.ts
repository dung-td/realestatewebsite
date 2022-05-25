export type Estate = {
    _id: string,
    title: string,
    address: string,
    estateType: {
        name: string,
        slug: string
    },
    thumbnail: string,
    price: string,
    area: number,
    bathroom: number,
    bedroom: number,
    ownerName: string,
    ownerPhone: string,
    titleColor: string,
    slug: string,
    purpose: string,
}