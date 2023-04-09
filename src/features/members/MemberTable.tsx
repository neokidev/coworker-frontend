import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Group, Skeleton } from '@mantine/core'
import {
  Member,
  useCreateMember,
  useDeleteMember,
  useDeleteMembers,
  useGetMembers,
} from '@/features/members/useMembers'
import { CreateModal } from '@/features/members/CreateModal'
import { IconPlus } from '@tabler/icons'
import { getGetMembersQueryKey } from '@/api/endpoints/members/members'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Table } from '@/components/Table'

const PAGE_SIZES = [5, 10]

export function MemberTable() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1])
  const { data, isLoading } = useGetMembers(page, pageSize)
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])

  const queryClient = useQueryClient()
  const onMutateSuccess = useCallback(() => {
    const queryKey = getGetMembersQueryKey({
      page_id: page,
      page_size: pageSize,
    })
    queryClient.invalidateQueries(queryKey)
  }, [queryClient, page, pageSize])

  const { createMember } = useCreateMember(onMutateSuccess)
  const { deleteMember } = useDeleteMember(onMutateSuccess)
  const { deleteMembers } = useDeleteMembers(onMutateSuccess)
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

  const openCreateModal = useCallback(() => {
    setIsOpenCreateModal(true)
  }, [])

  const deleteSelectedMembers = useCallback(
    (selectedMembers: Member[]) => {
      const ids = selectedMembers.map((member) => member.id)
      deleteMembers(ids)
      setSelectedMembers([])
    },
    [deleteMembers]
  )

  useEffect(() => {
    setPage(1)
  }, [pageSize])

  return (
    <>
      <Group mb="sm" position="right">
        {isLoading ? (
          <Skeleton width={86} height={36} />
        ) : (
          <>
            <Button leftIcon={<IconPlus size={16} />} onClick={openCreateModal}>
              追加
            </Button>
          </>
        )}
      </Group>
      <Table
        data={data?.data}
        columns={[
          {
            key: 'fullName',
            header: '名前',
          },
          { key: 'email', header: 'Eメールアドレス' },
          {
            key: 'dateAdded',
            header: '追加日',
            render: (member: Member) =>
              dayjs(member.dateAdded).format('YYYY/MM/DD'),
          },
        ]}
        totalCount={data?.meta.totalCount}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        selection={selectedMembers}
        onSelectionChange={setSelectedMembers}
        isLoading={isLoading}
        onEditRow={(row) => router.push(`/members/${row.id}/edit`)}
        onDeleteRow={(row) => deleteMember(row.id)}
        onDeleteSelection={deleteSelectedMembers}
      />
      <CreateModal
        isOpen={isOpenCreateModal}
        setIsOpen={setIsOpenCreateModal}
        createMember={createMember}
      />
    </>
  )
}
