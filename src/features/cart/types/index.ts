export type Product = {
  id: string
  name: string
  price: number
  quantity: number
  isSelected: boolean
}

export type FormValues = {
  products: Product[]
}
