import type { Meta, StoryObj } from '@storybook/react'
import { Table, Column } from './Table'
import { FC, useCallback, useLayoutEffect, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'
import dayjs from 'dayjs'

type Item = {
  id: string
  name: string
  price: number
  quantity: number
}

const columns: Column<Item>[] = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'price',
    header: 'Price',
  },
  {
    key: 'quantity',
    header: 'Quantity',
  },
]

const dummyData = (size: number) => {
  const items = []
  for (let i = 0; i < size; i++) {
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
  const [totalCount] = useState(100)
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
  const [data, setData] = useState(dummyData(pagination.pageSize))

  useLayoutEffect(() => {
    setData(dummyData(pagination.pageSize))
  }, [pagination])

  const handleSearch = useCallback((query: string) => alert(query), [])
  const handleAddItem = useCallback(
    () => setData((data) => [...dummyData(1), ...data]),
    []
  )
  const handleDeleteSelection = useCallback(
    (selection: string[]) =>
      setData((data) => data.filter((item) => !selection.includes(item.id))),
    []
  )

  return (
    <Table
      data={data}
      columns={columns}
      totalCount={totalCount}
      pagination={pagination}
      pageSizeOptions={[10, 20, 30]}
      onPaginationChange={setPagination}
      onAddItem={handleAddItem}
      onDeleteSelection={handleDeleteSelection}
      onSearch={handleSearch}
      tableViewportHeight={300}
    />
  )
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
