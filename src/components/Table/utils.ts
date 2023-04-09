import { HasIdObject } from '@/types/types'
import { DataTableColumn } from 'mantine-datatable'
import { Column } from '@/components/Table/Table'

export function convertToMantineDataTableColumns<TData extends HasIdObject>(
  columns: Column<TData>[]
): DataTableColumn<TData>[] {
  return columns.map((column) => {
    return {
      accessor: column.key,
      title: column.header,
      ellipsis: true,
      render: column.render,
    }
  })
}
