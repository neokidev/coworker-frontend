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
    quantity: 1,
    isSelected: true,
  },
  {
    id: createId(),
    name: 'Item 2',
    price: 500,
    quantity: 3,
    isSelected: false,
  },
  {
    id: createId(),
    name: 'TP-Link Bluetooth USB Bluetooth 5.0 対応 パソコン / タブレット 対応 アダプタ ブルートゥース子機 メーカー保証3年UB500',
    price: 350,
    quantity: 2,
    isSelected: true,
  },
]

const CartPage: NextPage = () => {
  return (
    <MainLayout title="カート" miw={1280}>
      <Cart initialProducts={products} />
    </MainLayout>
  )
}

export default CartPage
