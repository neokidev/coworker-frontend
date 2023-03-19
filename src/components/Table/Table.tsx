import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { getSortedRowModel } from '@tanstack/react-table'
import {
  createStyles,
  Group,
  ScrollArea,
  Table as MantineTable,
  Text,
  rem,
  UnstyledButton,
  Center,
  Checkbox,
} from '@mantine/core'
import { FC, MouseEventHandler, ReactNode, useState } from 'react'
import { IconSelector } from '@tabler/icons-react'
import { HasIdObject } from '@/types/types'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },

  checkbox: {
    input: {
      cursor: 'pointer',
    },
  },
}))

type ThProps = {
  children: ReactNode
  sortable: boolean
  reversed: boolean
  sorted: boolean
  onSort?: MouseEventHandler<HTMLButtonElement>
}

const Th: FC<ThProps> = ({ children, sortable, reversed, sorted, onSort }) => {
  const { classes } = useStyles()
  const Icon = sortable
    ? sorted
      ? reversed
        ? IconChevronUp
        : IconChevronDown
      : IconSelector
    : undefined
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            {Icon && <Icon size="0.9rem" stroke={1.5} />}
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

export type TableColumn<TData> = ColumnDef<TData>

export type TableProps<TData extends HasIdObject> = {
  data: TData[]
  columns: TableColumn<TData>[]
}

export const Table = <TData extends HasIdObject>({
  data,
  columns,
}: TableProps<TData>): JSX.Element => {
  const { classes } = useStyles()
  const [selection, setSelection] = useState<string[]>([])

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rows = table.getRowModel().rows.map((row) => {
    const rowId = row.original.id
    return (
      <tr key={rowId}>
        <td>
          <Checkbox
            className={classes.checkbox}
            checked={selection.includes(rowId)}
            onChange={() => toggleRow(rowId)}
            transitionDuration={0}
          />
        </td>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    )
  })

  return (
    <ScrollArea>
      <MantineTable
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: 'fixed' }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th style={{ width: 40 }}>
                <Checkbox
                  className={classes.checkbox}
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== data.length
                  }
                  transitionDuration={0}
                />
              </th>
              {headerGroup.headers.map((header) => {
                const sortable = header.column.getCanSort()
                const isSorted = header.column.getIsSorted()

                return (
                  <Th
                    key={header.id}
                    sortable={sortable}
                    reversed={isSorted === 'desc'}
                    sorted={!!isSorted}
                    onSort={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </MantineTable>
    </ScrollArea>
  )
}
