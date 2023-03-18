import { NextPage } from 'next'
import { MainLayout } from '@/components/Layout'
import { Cart } from '@/features/cart/components/Cart'
import { CartProduct } from '@/features/cart/types'
import { createId } from '@paralleldrive/cuid2'

const products: CartProduct[] = [
  {
    id: createId(),
    name: 'Item 1',
    price: 1000,
    amount: 1,
    isRemoved: false,
  },
  {
    id: createId(),
    name: 'Item 2',
    price: 500,
    amount: 3,
    isRemoved: false,
  },
  {
    id: createId(),
    name: 'Item 3',
    price: 350,
    amount: 2,
    isRemoved: false,
  },
]

const CartPage: NextPage = () => {
  return (
    <MainLayout title="カート" miw={1280}>
      <Cart products={products} />
    </MainLayout>
  )
}

export default CartPage
