export default interface News {
  _id: string
  title: string
  body: [NewsDetails]
  slug: string
  author: string
  description: string
  submitday: string
  tags: string
  type: string
  views: number
  thumnail: string
}

interface NewsDetails {
  type: string
  src: string
}
