import { FC } from 'react'
import {
  Button,
  Card,
  Group,
  Text,
  Divider,
  Container,
  useMantineTheme,
  Stack,
} from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import {
  calculateShippingCost,
  calculateSubtotal,
  calculateTotal,
  calculateTotalPoint,
  FormValues,
  isCartEmpty,
} from '@/features/cart/components/Cart'

export const OrderSummaryCard: FC = () => {
  const theme = useMantineTheme()
  const { watch } = useFormContext<FormValues>()
  const products = watch('products')
  const subtotal = calculateSubtotal(products)
  const shippingCost = calculateShippingCost(products)

  return (
    <Card w={280} shadow="sm" padding="lg" radius="md" withBorder>
      {isCartEmpty(products) ? (
        <Stack>
          <Text size="lg">商品が選択されていません</Text>
          <Button variant="light" color="blue" fullWidth radius="md" disabled>
            注文を確定
          </Button>
        </Stack>
      ) : (
        <>
          <Container mb="xs" px={0}>
            <Group mb="xs">
              <Text weight={700} size="xl">
                注文内容
              </Text>
            </Group>
            <Text size="sm">
              <Group>
                <div className="flex-1">商品の小計：</div>
                <Text>¥{subtotal}</Text>
              </Group>
              <Group>
                <div className="flex-1">配送料：</div>
                <Text>¥{shippingCost}</Text>
              </Group>
            </Text>
          </Container>
          <Divider />
          <Container my="xs" px={0}>
            <Text weight={700} size="xl" color={theme.colors.red[9]}>
              <Group>
                <div className="flex-1">ご請求額：</div>
                <Text>¥{calculateTotal(subtotal, shippingCost)}</Text>
              </Group>
            </Text>
          </Container>
          <Divider />
          <Container my="xs" px={0}>
            <Text my={12} size="sm">
              <Group>
                <div className="flex-1">獲得ポイント：</div>
                <Text weight={700} color={theme.colors.red[9]}>
                  +{calculateTotalPoint(products)}ポイント
                </Text>
              </Group>
            </Text>
          </Container>
          <Button variant="light" color="blue" fullWidth radius="md">
            注文を確定
          </Button>
        </>
      )}
    </Card>
  )
}
