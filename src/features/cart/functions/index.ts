import { Product } from '../types'

const DEFAULT_SHIPPING_COST = 340

export const calculateSubtotal = (products: Product[]) => {
  return products
    .filter((product) => product.isSelected)
    .reduce((total, product) => total + product.price * product.quantity, 0)
}

export const calculateShippingCost = (products: Product[]) => {
  return calculateSubtotal(products) < 5000 ? DEFAULT_SHIPPING_COST : 0
}

export const calculateTotal = (subtotal: number, shippingCost: number) => {
  return subtotal + shippingCost
}

export const calculatePoint = (price: number) => {
  return Math.round(price / 100)
}

export const calculateTotalPoint = (products: Product[]) => {
  return products
    .filter((product) => product.isSelected)
    .reduce(
      (total, product) =>
        total + calculatePoint(product.price) * product.quantity,
      0
    )
}

export const isCartEmpty = (products: Product[]) => {
  return (
    products.filter((product) => product.isSelected).length === 0 ||
    calculateSubtotal(products) === 0
  )
}
