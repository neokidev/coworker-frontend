import type { Meta, StoryObj } from '@storybook/react'
import { Table, Column } from './Table'
import { FC, useCallback, useLayoutEffect, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Menu,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { IconPlus, IconTrash } from '@tabler/icons'
import { IconDotsVertical, IconSearch } from '@tabler/icons-react'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
  const [selection, setSelection] = useState<string[]>([])
  const [data, setData] = useState(dummyData(pagination.pageSize))
  const [filteredData, setFilteredData] = useState(data)

  console.log('selection:', selection)

  useLayoutEffect(() => {
    setData(dummyData(pagination.pageSize))
  }, [pagination])

  const handleSearch = useCallback(
    () =>
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ),
    [data, searchQuery]
  )
  const handleAddItem = useCallback(
    () => setData((data) => [...dummyData(1), ...data]),
    []
  )
  const handleDeleteSelection = useCallback(
    () =>
      setData((data) => data.filter((item) => !selection.includes(item.id))),
    [selection]
  )

  const menus = [
    <Button
      key="add-button"
      radius="md"
      leftIcon={<IconPlus size="1rem" />}
      onClick={handleAddItem}
    >
      追加
    </Button>,
    <TextInput
      key="search-form"
      placeholder="検索..."
      radius="md"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch()
        }
      }}
      rightSection={
        <UnstyledButton onClick={handleSearch}>
          <IconSearch size="1rem" />
        </UnstyledButton>
      }
    />,
    <Menu key="other-menus" shadow="md" radius="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="default" size="2.25rem" radius="md">
          <IconDotsVertical size="1.125rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label pt="sm">表示する列</Menu.Label>
        {columns.map((column) => (
          <Menu.Item key={column.key} closeMenuOnClick={false}>
            <Group spacing="sm">
              <Checkbox checked={true} />
              <Text fz="sm">{column.header as string}</Text>
            </Group>
          </Menu.Item>
        ))}

        <Menu.Divider />

        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={handleDeleteSelection}
        >
          選択した列を削除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>,
  ]

  return (
    <Table
      data={filteredData}
      columns={columns}
      totalCount={totalCount}
      pagination={pagination}
      pageSizeOptions={[10, 20, 30]}
      onPaginationChange={setPagination}
      onSelectionChange={setSelection}
      headerMenus={menus}
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
