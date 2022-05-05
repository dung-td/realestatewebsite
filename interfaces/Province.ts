export type Province = {
  value: string
  code: number
  districts: Array<District>
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
