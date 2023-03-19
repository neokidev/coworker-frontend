import { FC } from 'react'
import { OrderSummaryCard } from './OrderSummaryCard'
import { Group } from '@mantine/core'
import { ProductsCard } from '@/features/cart/components/ProductsCard'
import { CartProduct } from '@/features/cart/types'
import { useForm } from '@/components/Form'
import { sumBy } from 'lodash'

const DEFAULT_SHIPPING_COST = 340

type CartProps = {
  initialProducts: CartProduct[]
}

export type ProductFormValues = {
  id: string
  name: string
  price: number
  quantity: number
  isSelected: boolean
}

export type FormValues = {
  products: ProductFormValues[]
}

export const calculateSubtotal = (products: ProductFormValues[]) => {
  return products
    .filter((product) => product.isSelected)
    .reduce((total, product) => total + product.price * product.quantity, 0)
}

export const calculateShippingCost = (products: ProductFormValues[]) => {
  return calculateSubtotal(products) < 5000 ? DEFAULT_SHIPPING_COST : 0
}

export const calculateTotal = (subtotal: number, shippingCost: number) => {
  return subtotal + shippingCost
}

export const calculatePoint = (price: number) => {
  return Math.round(price / 100)
}

export const calculateTotalPoint = (products: ProductFormValues[]) => {
  return products
    .filter((product) => product.isSelected)
    .reduce(
      (total, product) =>
        total + calculatePoint(product.price) * product.quantity,
      0
    )
}

export const isCartEmpty = (products: ProductFormValues[]) => {
  return products.filter((product) => product.isSelected).length === 0
}

export const Cart: FC<CartProps> = ({ initialProducts }) => {
  const [Form] = useForm<FormValues>({
    defaultValues: {
      products: initialProducts,
    },
    mode: 'onTouched',
    onSubmit: (data) => {
      console.log(data)
    },
  })

  return (
    <Form>
      <Group align="start">
        <div className="flex-1">
          <ProductsCard />
        </div>
        <OrderSummaryCard />
      </Group>
    </Form>
  )
}
