interface IContentSegment{
    type: 'image'| 'text',
    content: string,
    caption: string,
    _id: string
}
interface PostDto{
    _id: string,
    name: string,
    address: string,
    postType: {
        name: string,
        title_color: string
    },
    projectType: string,
    investor: {
        name: string,
        phone: string,
        avatar: string
    },
    status: string,
    projectStatus: string,
    location: {
        CityName: string,
        DistrictName: string,
        DistrictPrefix: string,
        Label: string,
        StreetName: string,
        StreetPrefix: string,
        WardName: string,
        WardPrefix: string
    },
    cor: {
        lat: number,
        Lng: number
    },
    description: Array<IContentSegment>,
    images: Array<string>,
    utilities: Array<string>,
    legalDocuments: string,
    publishedDate: string,
    expiredDate: string,
    estimatedStartTime: string,
    estimatedCompletionTime: string,
    price: number,
    area: number,
    aparmentNumber: number,
    buildingNumber: number,
    density: number,
    declineReason: string,
    slug: string
}
export default PostDto
