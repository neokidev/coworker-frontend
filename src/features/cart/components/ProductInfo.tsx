import { FC } from 'react'
import { Checkbox, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { CartProduct } from '../types'

type ProductInfoProps = {
  product: CartProduct
}

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const theme = useMantineTheme()
  return (
    <Group>
      <Checkbox checked={!product.isRemoved} />
      <div className="flex-1">
        <Stack spacing="xs">
          <Text fz="lg">{product.name}</Text>
          <Text fz="sm">数量：{product.amount}</Text>
        </Stack>
      </div>
      <Stack align="flex-end" justify="flex-start" spacing="xs">
        <Text fz="xl" fw={600}>
          ¥{product.price}
        </Text>
        <Text fz="sm" color={theme.colors.red[9]}>
          +{Math.round(product.price / 100)}ポイント
        </Text>
      </Stack>
    </Group>
  )
}
