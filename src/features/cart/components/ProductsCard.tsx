import { ProductInfo } from '@/features/cart/components/ProductInfo'
import { CartProduct } from '@/features/cart/types'
import { FC } from 'react'
import { Card, Divider, Group, Text } from '@mantine/core'

type ProductsCardProps = {
  products: CartProduct[]
}

export const ProductsCard: FC<ProductsCardProps> = ({ products }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {products.length > 0 ? (
        <>
          <Text>商品</Text>
          <Divider />
          {products.map((product) => (
            <>
              <ProductInfo key={product.id} product={product} />
              <Divider />
            </>
          ))}

          <Group position="right" spacing={0}>
            <Text>小計 (税込)：</Text>
            <Text>¥1,980</Text>
          </Group>
        </>
      ) : (
        <Text>商品はありません。</Text>
      )}
    </Card>
  )
}
