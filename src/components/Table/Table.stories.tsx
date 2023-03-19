import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableColumn } from './Table'
import { FC } from 'react'
import { createId } from '@paralleldrive/cuid2'

type Item = {
  id: string
  name: string
  price: number
  quantity: number
}

const columns: TableColumn<Item>[] = [
  {
    header: 'Name',
    cell: (row) => row.renderValue(),
    accessorKey: 'name',
  },
  {
    header: 'Price',
    cell: (row) => row.renderValue(),
    accessorKey: 'price',
  },
  {
    header: 'Quantity',
    cell: (row) => row.renderValue(),
    accessorKey: 'quantity',
  },
]

const dummyData = () => {
  const items = []
  for (let i = 0; i < 10; i++) {
    const id = createId()
    items.push({
      id,
      name: `Item ${id}`,
      price: 100 * i,
      quantity: i + 1,
    })
  }
  return items
}

const Wrapper: FC = () => {
  return <Table data={dummyData()} columns={columns} />
}

const meta: Meta<typeof Wrapper> = {
  title: 'Example/Table',
  component: Wrapper,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Wrapper>

export const Basic: Story = {
  args: {},
}
