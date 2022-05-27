export type Province = {
  label: string
  value: number
  slug: string
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
