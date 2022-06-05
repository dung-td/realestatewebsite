export type Search = {
  keyword?: string
  province?: string
  district?: string
  ward?: string
  street?: string
  project?: string
  price?: {
    min: string,
    max: string,
  }
  area?: {
    min: string,
    max: string,
  }
  type?: string
  bedroom?: {
    min: string,
    max: string,
  }
  width?: {
    min: string,
    max: string,
  }
  saleOrRent?: string
  streetWidth?: {
    min: string,
    max: string,
  }
  orientation?: string
  projectStatus?: string
}
