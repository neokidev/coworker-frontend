import { FC } from 'react'
import { Flex, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { NumberInput, Checkbox } from '@/components/Form'
import { Product } from '../types'
import { calculatePoint } from '../functions'

type ProductInfoProps = {
  index: number
  product: Product
}

export const ProductInfo: FC<ProductInfoProps> = ({ product, index }) => {
  const theme = useMantineTheme()

  return (
    <Group my="sm">
      <Checkbox label={undefined} name={`products.${index}.isSelected`} />
      <div className="flex-1">
        <Stack spacing={4}>
          <Flex gap="xs">
            <div className="flex-1">
              <Text fz="lg">{product.name}</Text>
            </div>
            <Stack align="flex-end" justify="flex-start" spacing={0}>
              <Text fz="xl" fw={600}>
                ¥{product.price.toLocaleString()}
              </Text>
              <Text fz="xs" color={theme.colors.red[9]}>
                +{calculatePoint(product.price).toLocaleString()}ポイント
              </Text>
            </Stack>
          </Flex>
          <Group spacing={0}>
            <Text>数量：</Text>
            <NumberInput
              w={80}
              label={undefined}
              name={`products.${index}.quantity`}
              min={1}
            />
          </Group>
        </Stack>
      </div>
    </Group>
  )
}
