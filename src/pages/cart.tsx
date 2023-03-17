import { NextPage } from 'next'
import { MainLayout } from '@/components/Layout'
import { Cart } from '@/features/cart/components/Cart'

const CartPage: NextPage = () => {
  return (
    <MainLayout title="カート">
      <Cart />
    </MainLayout>
  )
}

export default CartPage
