import { ProductInfo } from '@/features/cart/components/ProductInfo'
import { CartProduct } from '@/features/cart/types'
import { FC } from 'react'
import { Card, Container, Divider, Group, Text } from '@mantine/core'
import { sumBy } from 'lodash'

type ProductsCardProps = {
  products: CartProduct[]
}

export const ProductsCard: FC<ProductsCardProps> = ({ products }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {products.length > 0 ? (
        <>
          <Text mb="xs" fw={700} fz="xl">
            商品
          </Text>
          <Divider />
          {products.map((product) => (
            <>
              <Container px={0} my="xs">
                <ProductInfo key={product.id} product={product} />
              </Container>
              <Divider />
            </>
          ))}
          <Group mt="xs" position="right" spacing={0}>
            <Text>小計 (税込)：</Text>
            <Text fw={600} fz="xl">
              ¥{sumBy(products, 'price')}
            </Text>
          </Group>
        </>
      ) : (
        <Text>商品はありません。</Text>
      )}
    </Card>
  )
}
