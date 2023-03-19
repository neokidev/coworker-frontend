import { useState } from 'react'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconGripVertical } from '@tabler/icons'
import {
  Button,
  Checkbox,
  createStyles,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core'
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core'

type Item = {
  id: string
  field: string
  title: string
}

const columns: Item[] = [
  {
    id: '1',
    field: 'name',
    title: '名前',
  },
  {
    id: '2',
    field: 'email',
    title: 'メールアドレス',
  },
  {
    id: '3',
    field: 'company',
    title: '会社',
  },
]

const useStyles = createStyles((theme) => ({
  item: {
    padding: `4px 0`,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
  },

  checkbox: {
    input: {
      cursor: 'pointer',
    },
  },
}))

const Card = ({ item }: { item: Item }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: item.id,
  })

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
  }

  const { classes, cx } = useStyles()

  return (
    <Group
      ref={setNodeRef}
      className={classes.item}
      style={sortableStyle}
      position="apart"
    >
      <Flex mr="xs">
        <Checkbox mr="xs" className={classes.checkbox} />
        <Text size="sm">{item.title}</Text>
      </Flex>
      <div className={classes.dragHandle} {...attributes} {...listeners}>
        {/*<div {...attributes} {...listeners}>*/}
        <IconGripVertical size={18} stroke={1.5} />
      </div>
    </Group>
  )
}

export const SortableList = () => {
  const { setNodeRef } = useDroppable({ id: '1' })

  const [items, setItems] = useState(columns)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = active.id
    const overId = over?.id

    if (!!overId && activeId !== overId) {
      setItems((items) => {
        const oldIndex = items.findIndex(({ id }) => id === activeId.toString())
        const newIndex = items.findIndex(({ id }) => id === overId.toString())
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div ref={setNodeRef}>
          {items.map((item) => (
            <Card key={item.id} item={item}></Card>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
