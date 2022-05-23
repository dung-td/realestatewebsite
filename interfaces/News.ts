export type News = {
    _id: string
    title: string
    body: Array<postDetails>
    tags: string
    author: string
    views: number
    type: string
    submitday: Date
    description: string
}

type postDetails = {
    src: string
    type: string
}