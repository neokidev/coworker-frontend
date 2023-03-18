import { FC } from 'react'
import { Checkbox, Flex, Group, Stack, Text } from '@mantine/core'
import { CartProduct } from '../types'

type ProductInfoProps = {
  product: CartProduct
}

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  return (
    <Group>
      <Checkbox checked={!product.isRemoved} />
      <div className="flex-1">
        <Stack>
          <Text>{product.name}</Text>
          <Text>数量：{product.amount}</Text>
        </Stack>
      </div>
      <Stack align="flex-end" justify="flex-start">
        <Text>¥{product.price}</Text>
        <Text>{Math.round(product.price / 100)}ポイント</Text>
      </Stack>
    </Group>
  )
}
