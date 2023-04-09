import { MainLayout } from '@/components/Layout'
import { MembersTable } from '@/features/members'
import { MembersTable2 } from '@/features/members/MemberTable2'
import { useCallback, useEffect, useState } from 'react'
import { DataTable } from 'mantine-datatable'
import dayjs from 'dayjs'
import { Box, Button, Group, rem, Skeleton, Stack } from '@mantine/core'
import { IconEdit, IconTrash, IconTrashX } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import {
  Member,
  useCreateMember,
  useDeleteMember,
  useDeleteMembers,
  useGetMembers,
  useUpdateMember,
} from '@/features/members/useMembers'
import { CreateModal } from '@/features/members/CreateModal'
import { IconPlus } from '@tabler/icons'
import { getGetMembersQueryKey } from '@/api/endpoints/members/members'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const PAGE_SIZES = [5, 10]

function Table() {
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

  const deleteSelectedMembers = useCallback(() => {
    const ids = selectedMembers.map((member) => member.id)
    deleteMembers(ids)
    setSelectedMembers([])
  }, [selectedMembers, deleteMembers])

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
      <Box>
        <DataTable
          withBorder
          borderRadius="sm"
          withColumnBorders
          striped
          verticalAlignment="top"
          fetching={isLoading}
          columns={[
            {
              accessor: 'fullName',
              title: '名前',
              ellipsis: true,
              width: 200,
            },
            { accessor: 'email', title: 'Eメールアドレス', ellipsis: true },
            {
              accessor: 'dateAdded',
              title: '追加日',
              ellipsis: true,
              width: 120,
              render: (member: Member) =>
                dayjs(member.dateAdded).format('YYYY/MM/DD'),
            },
          ]}
          records={data?.data}
          page={page}
          onPageChange={setPage}
          totalRecords={data?.meta.totalCount}
          recordsPerPage={pageSize}
          onRecordsPerPageChange={setPageSize}
          recordsPerPageOptions={PAGE_SIZES}
          selectedRecords={selectedMembers}
          onSelectedRecordsChange={setSelectedMembers}
          onRowClick={(row) =>
            setSelectedMembers((selectedRecords) => {
              const index = selectedRecords.findIndex(
                (selectedRecord) => selectedRecord.id === row.id
              )

              if (index === -1) {
                return [...selectedRecords, row]
              }
              return [
                ...selectedRecords.slice(0, index),
                ...selectedRecords.slice(index + 1),
              ]
            })
          }
          rowContextMenu={{
            items: (row) => [
              {
                key: 'edit',
                icon: <IconEdit size={14} />,
                title: `Edit`,
                onClick: () => {
                  router.push(`/members/${row.id}/edit`)
                },
              },
              {
                key: 'delete',
                title: `Delete`,
                icon: <IconTrashX size={14} />,
                color: 'red',
                onClick: () => deleteMember(row.id),
              },
              {
                key: 'deleteMany',
                hidden:
                  selectedMembers.length <= 1 ||
                  !selectedMembers.map((r) => r.id).includes(row.id),
                title: `Delete ${selectedMembers.length} selected records`,
                icon: <IconTrash size={14} />,
                color: 'red',
                onClick: deleteSelectedMembers,
              },
            ],
          }}
        />
      </Box>
      <CreateModal
        isOpen={isOpenCreateModal}
        setIsOpen={setIsOpenCreateModal}
        createMember={createMember}
      />
    </>
  )
}

export default function Members() {
  return (
    <MainLayout title="メンバー一覧">
      <Table />
      <MembersTable />
      <MembersTable2 />
    </MainLayout>
  )
}
