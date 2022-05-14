export default interface PostDto{
    _id: string,
    title: string,
    address: string,
    owner: {
        name: string,
        avatar: string,
        email: string,
        phone: string
    },
    status: string,
    postType: {
        name: string,
        title_color: string
    },
    estateType: string,
    forSaleOrRent: string,
    location: {
        CityName: string,
        DistrictName: string,
        DistrictPrefix: string,
        Label: string,
        StreetName: string,
        StreetPrefix: string,
        WardName: null,
        WardPrefix: null
    },
    cor: {
        lat: number,
        Lng: number
    },
    belongToProject: {
        projectId: number,
        projectName: null
    },
    description: string,
    images: [ string ],
    legalDocuments: string,
    publishedDate: string,
    expiredDate: string,
    approvedDate: string,
    reviewExpireDate: string,
    price: number,
    priceType: string,
    area: number,
    floorNumber: number,
    bathroomNumber: number,
    bedroomNumber: number,
    direction: string,
    furniture: string,
    width: number,
    depth: number,
    roadWidth: number,
    facade: number
}