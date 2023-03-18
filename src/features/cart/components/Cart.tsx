import { FC } from 'react'
import { OrderSummaryCard } from './OrderSummaryCard'
import { Group, Text } from '@mantine/core'
import { ProductsCard } from '@/features/cart/components/ProductsCard'
import { CartProduct } from '@/features/cart/types'

type CartProps = {
  products: CartProduct[]
}

export const Cart: FC<CartProps> = ({ products }) => {
  return (
    <Group align="start">
      <div className="flex-1">
        <ProductsCard products={products} />
      </div>
      <OrderSummaryCard />
    </Group>
  )
}
