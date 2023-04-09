import { Table, Column } from '@/components/Table'
import {
  Member,
  useCreateMember,
  useDeleteMembers,
  useGetMembers,
} from '@/features/members/useMembers'
import { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Menu,
  Text,
  Stack,
} from '@mantine/core'
import { IconPlus, IconTrash } from '@tabler/icons'
import { IconDotsVertical, IconSearch } from '@tabler/icons-react'
import { CreateModal } from '@/features/members/CreateModal'

export const MembersTable2 = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 })
  const [selection, setSelection] = useState<string[]>([])
  const { data, isLoading, error } = useGetMembers(
    pagination.page,
    pagination.pageSize
  )
  const { createMember } = useCreateMember(pagination.page, pagination.pageSize)
  const { deleteMembers } = useDeleteMembers(
    pagination.page,
    pagination.pageSize
  )

  const columns: Column<Member>[] = [
    {
      key: 'fullName',
      header: '名前',
    },
    {
      key: 'email',
      header: 'メールアドレス',
    },
    {
      key: 'dateAdded',
      header: '追加日',
      render: ({ dateAdded }) => dayjs(dateAdded).format('YYYY/MM/DD'),
    },
  ]

  const handleClickAddButton = useCallback(() => {
    setIsOpenCreateModal(true)
  }, [])
  const handleDeleteSelection = useCallback(() => {
    deleteMembers(selection)
    setSelection([])
  }, [deleteMembers, selection, setSelection])

  const menus = [
    <Button
      key="add-button"
      // radius="md"
      leftIcon={<IconPlus size="1rem" />}
      onClick={handleClickAddButton}
    >
      追加
    </Button>,
    <Menu key="other-menus" shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="default" size="2.25rem">
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <Stack>
      <Group position="right">{menus}</Group>
      <Table
        data={data?.data || []}
        columns={columns}
        totalCount={data?.meta.totalCount || 0}
        pagination={pagination}
        pageSizeOptions={[5, 10]}
        onSelectionChange={setSelection}
        onPaginationChange={setPagination}
      />
      <CreateModal
        isOpen={isOpenCreateModal}
        setIsOpen={setIsOpenCreateModal}
        createMember={createMember}
      />
    </Stack>
  )
}
