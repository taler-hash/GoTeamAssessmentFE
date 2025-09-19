export interface MetaLink {
  url: string | null
  label: string
  page: number | null
  active: boolean
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: MetaLink[]
  path: string
  per_page: number
  to: number
  total: number
}