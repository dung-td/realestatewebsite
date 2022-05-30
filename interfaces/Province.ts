export type Province = {
  label: string
  value: string
  slug: string
  postCount: number
  img: string
}

type District = {
  name: string
  code: number
  wards: Array<Ward>
}

type Ward = {
  name: string
  code: number
}
