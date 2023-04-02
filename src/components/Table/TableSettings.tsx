import {
  Button,
  Checkbox,
  Divider,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { useStyles } from './Table'
import { IconGripVertical } from '@tabler/icons'
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Column, Table } from '@tanstack/react-table'

type DisplayColumnCardProps<TData> = {
  column: Column<TData, any>
}

const DisplayColumnCard = <TData,>({
  column,
}: DisplayColumnCardProps<TData>): JSX.Element => {
  const { classes } = useStyles()
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: column.id,
  })
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
  }

  return (
    <Group
      ref={setNodeRef}
      className={classes.displayColumnCard}
      style={sortableStyle}
    >
      <div style={{ flex: 1 }}>
        <Group spacing="sm">
          <Checkbox
            className={classes.checkbox}
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />
          <Text fz="sm">{column.columnDef.header as string}</Text>
        </Group>
      </div>
      <UnstyledButton
        className={classes.dragButton}
        {...attributes}
        {...listeners}
      >
        <IconGripVertical className="h-4" />
      </UnstyledButton>
    </Group>
  )
}

type DisplayColumnListProps<TData> = {
  table: Table<TData>
}

const DisplayColumnList = <TData,>({
  table,
}: DisplayColumnListProps<TData>): JSX.Element => {
  const columns = table.getAllLeafColumns()
  const { setColumnOrder } = table
  const { setNodeRef } = useDroppable({ id: '1' })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = active.id
    const overId = over?.id

    if (!!overId && activeId !== overId) {
      setColumnOrder((order) => {
        const oldIndex = order.findIndex((id) => id === activeId.toString())
        const newIndex = order.findIndex((id) => id === overId.toString())
        return arrayMove(order, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={columns} strategy={rectSortingStrategy}>
        <Stack ref={setNodeRef} spacing={0}>
          {columns.map((column) => (
            <DisplayColumnCard key={column.id} column={column} />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  )
}

type TableSettingsProps<TData> = {
  table: Table<TData>
}

export const TableSettings = <TData,>({
  table,
}: TableSettingsProps<TData>): JSX.Element => {
  return (
    <Stack spacing="xs">
      <Stack spacing={4}>
        <Text fz="xs" c="dimmed" px={8}>
          表示する列
        </Text>
        <DisplayColumnList table={table} />
      </Stack>
      <Divider />
      <Text fz="xs" c="dimmed" px={8}>
        選択した列を削除
      </Text>
      <Divider />
      <Stack>
        <Button variant="light" radius="md" mx={4} p={4}>
          CSVダウンロード
        </Button>
      </Stack>
    </Stack>
  )
}
