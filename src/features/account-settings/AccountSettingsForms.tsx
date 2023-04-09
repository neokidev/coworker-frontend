import { z } from 'zod'
import { SyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Group, Stepper } from '@mantine/core'
import { PersonalDetailForms } from '@/features/account-settings/PersonalDetailForms'
import { FormValues } from '@/features/account-settings/types'
import { AccountDetailForms } from '@/features/account-settings/AccountDetailForms'

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  age: z
    .number()
    .min(18, { message: 'You must be at least 18 to create an account' }),
  fullName: z
    .string()
    .min(2, { message: 'Full Name should have at 2 letters' }),
  country: z
    .string()
    .min(2, { message: 'Country should have at least 2 letters' }),
})

export const AccountSettingsForms = () => {
  const [active, setActive] = useState(0)

  const {
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      age: undefined,
      fullName: '',
      country: '',
    },
  })

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const nextStep = async (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let isValid
    switch (active) {
      case 0:
        isValid = await trigger(['name', 'email', 'age'])
        break
      case 1:
        isValid = await trigger(['fullName', 'country'])
        break
      default:
        throw new Error('Invalid step')
    }

    isValid && setActive((current) => (current < 3 ? current + 1 : current))
  }

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    alert(JSON.stringify(data, null, 4))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Account Details" />
        <Stepper.Step label="Personal Details"></Stepper.Step>
        <Stepper.Step label="Confirm" />
      </Stepper>

      {active === 0 && <AccountDetailForms control={control} errors={errors} />}
      {active === 1 && (
        <PersonalDetailForms control={control} errors={errors} />
      )}

      <Group position="right" mt="xl">
        {active > 0 && (
          <Button variant="default" onClick={prevStep}>
            戻る
          </Button>
        )}
        {active < 2 ? (
          <Button onClick={nextStep}>次へ</Button>
        ) : (
          <Button type="submit">保存</Button>
        )}
      </Group>
    </form>
  )
}
