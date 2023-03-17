import { FC } from 'react'
import {
  Badge,
  Button,
  Card,
  Group,
  Text,
  Image,
  Divider,
  Container,
  useMantineTheme,
} from '@mantine/core'

export const OrderSummaryCard: FC = () => {
  const theme = useMantineTheme()

  return (
    <Card w={280} shadow="sm" padding="lg" radius="md" withBorder>
      <Container mb="xs" px={0}>
        <Group mb="xs">
          <Text weight={700} size="xl">
            注文内容
          </Text>
        </Group>
        <Text size="sm">
          <Group>
            <div className="flex-1">商品の小計：</div>
            ¥3,100
          </Group>
          <Group>
            <div className="flex-1">配送料・手数料：</div>
            ¥0
          </Group>
        </Text>
      </Container>
      <Divider />
      <Container my="xs" px={0}>
        <Text weight={700} size="xl" color={theme.colors.red[9]}>
          <Group>
            <div className="flex-1">ご請求額：</div>
            ¥3,100
          </Group>
        </Text>
      </Container>
      <Divider />
      <Container my="xs" px={0}>
        <Text my={12} size="sm">
          <Group>
            <div className="flex-1">獲得ポイント：</div>
            <Text weight={700} color={theme.colors.red[9]}>
              +31ポイント
            </Text>
          </Group>
        </Text>
      </Container>
      <Button variant="light" color="blue" fullWidth radius="md">
        注文を確定
      </Button>
    </Card>
  )
}
