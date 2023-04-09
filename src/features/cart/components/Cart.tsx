import { FC } from 'react'
import { OrderSummaryCard } from './OrderSummaryCard'
import { Group } from '@mantine/core'
import { ProductsCard } from '@/features/cart/components/ProductsCard'
import { FormValues, Product } from '../types'
import { useForm } from '@/components/Form'

type CartProps = {
  initialProducts: Product[]
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
