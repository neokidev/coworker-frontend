import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { z } from 'zod'

const schema = z.object({
  id: z.string().uuid(),
  firstName: z
    .string()
    .min(2, { message: 'First name should have at 2 letters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name should have at least 2 letters' }),
  email: z
    .string()
    .min(0)
    .email({ message: 'Invalid email' })
    .optional()
    .or(z.literal('')),
})

export type FormValues = {
  id: string
  firstName: string
  lastName: string
  email: string
}

type Props = {
  initialValues: FormValues
  onSubmit: SubmitHandler<FormValues>
}

export const MemberForm: FC<Props> = ({ initialValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })
  console.log('initialValues:', initialValues)
  console.log('getValues:', getValues())

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group position="center" grow align="start">
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextInput
              withAsterisk
              label="姓"
              error={errors.lastName?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextInput
              withAsterisk
              label="名"
              error={errors.firstName?.message}
              {...field}
            />
          )}
        />
      </Group>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            className="mt-3"
            label="メールアドレス"
            error={errors.email?.message}
            {...field}
          />
        )}
      />

      <Group position="right" mt="lg">
        <Button type="submit">保存</Button>
      </Group>
    </form>
  )
}
