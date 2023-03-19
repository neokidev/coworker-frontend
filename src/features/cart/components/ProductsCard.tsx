import { ProductInfo } from '@/features/cart/components/ProductInfo'
import { FC, Fragment } from 'react'
import { Card, Container, Divider, Group, Text } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { FormValues } from '../types'
import { calculateSubtotal } from '../functions'

type ProductsCardProps = {}

export const ProductsCard: FC<ProductsCardProps> = () => {
  const { watch } = useFormContext<FormValues>()
  const products = watch('products')

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {products.length > 0 ? (
        <>
          <Text mb="xs" fw={700} fz="xl">
            商品
          </Text>
          <Divider />
          {products.map((product, index) => (
            <Fragment key={product.id}>
              <Container px={0} my="xs">
                <ProductInfo index={index} product={product} />
              </Container>
              <Divider />
            </Fragment>
          ))}
          <Group mt="xs" position="right" spacing={0}>
            <Text>小計 (税込)：</Text>
            <Text fw={600} fz="xl">
              ¥{calculateSubtotal(products).toLocaleString()}
            </Text>
          </Group>
        </>
      ) : (
        <Text>商品はありません。</Text>
      )}
    </Card>
  )
}
