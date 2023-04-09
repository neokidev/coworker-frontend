import { Dispatch, FC, SetStateAction, useCallback } from 'react'
import { Modal, Text, Title } from '@mantine/core'
import { SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { ApiCreateMemberRequest } from '@/api/model'
import { Camelized } from 'humps'
import { FormValues, MemberForm } from '@/features/members/MemberForm'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  createMember: (data: Camelized<ApiCreateMemberRequest>) => void
}

export const CreateModal: FC<Props> = ({ isOpen, setIsOpen, createMember }) => {
  const close = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const id = uuidv4()
    createMember({ id, ...data })
    close()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      title={
        <Text fz="lg" fw={700}>
          メンバー追加
        </Text>
      }
      size="lg"
    >
      <MemberForm
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
