import { HasIdObject } from '@/types/types'
import { ReactNode } from 'react'
import { IconEdit, IconTrash, IconTrashX } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { convertToMantineDataTableColumns } from '@/components/Table/utils'

export type Column<TData> = {
  key: Extract<keyof TData, string>
  header: string
  render?: (row: TData) => ReactNode
}

export type TableProps<TData extends HasIdObject> = {
  data?: TData[]
  columns: Column<TData>[]
  totalCount?: number
  page: number
  pageSize: number
  pageSizeOptions: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  selection: TData[]
  onSelectionChange: (selection: TData[]) => void
  onEditRow: (row: TData) => void
  onDeleteRow: (row: TData) => void
  onDeleteSelection: (selection: TData[]) => void
  isLoading?: boolean
}

export function Table<TData extends HasIdObject>({
  data,
  columns,
  totalCount,
  page,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  selection,
  onSelectionChange,
  onEditRow,
  onDeleteRow,
  onDeleteSelection,
  isLoading,
}: TableProps<TData>) {
  return (
    <DataTable
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      verticalAlignment="top"
      fetching={isLoading}
      columns={convertToMantineDataTableColumns(columns)}
      records={data}
      page={page}
      onPageChange={onPageChange}
      totalRecords={totalCount}
      recordsPerPage={pageSize}
      onRecordsPerPageChange={onPageSizeChange}
      recordsPerPageOptions={pageSizeOptions}
      recordsPerPageLabel="表示件数"
      selectedRecords={selection}
      onSelectedRecordsChange={onSelectionChange}
      onRowClick={(row) => {
        const index = selection.findIndex((item) => item.id === row.id)
        if (index === -1) {
          onSelectionChange([...selection, row])
          return
        }

        onSelectionChange([
          ...selection.slice(0, index),
          ...selection.slice(index + 1),
        ])
      }}
      rowContextMenu={{
        items: (row) => [
          {
            key: 'editRow',
            icon: <IconEdit size={14} />,
            title: '行を編集',
            onClick: () => onEditRow(row),
          },
          {
            key: 'deleteRow',
            title: '行を削除',
            icon: <IconTrashX size={14} />,
            color: 'red',
            onClick: () => onDeleteRow(row),
          },
          {
            key: 'deleteSelection',
            hidden:
              selection.length === 0 ||
              !selection.map((r) => r.id).includes(row.id),
            title: `選択した ${selection.length} 行を削除`,
            icon: <IconTrash size={14} />,
            color: 'red',
            onClick: () => onDeleteSelection(selection),
          },
        ],
      }}
    />
  )
}
