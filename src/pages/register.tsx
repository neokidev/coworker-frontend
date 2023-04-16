import {
  Checkbox,
  Paper,
  Container,
  Group,
  Center,
  Stack,
  Divider,
  Button,
  px,
  Flex,
} from '@mantine/core'
import Image from 'next/image'
import { useAuth } from '@/features/auth'
import { PasswordInput, TextInput, useForm } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

const minPasswordLength = 14

const schema = z
  .object({
    firstName: z.string().min(1, { message: 'Required' }),
    lastName: z.string().min(1, { message: 'Required' }),
    email: z
      .string()
      .min(1, { message: 'Required' })
      .email({ message: 'Wrong Format' }),
    password: z.string().min(minPasswordLength, { message: 'Required' }),
    confirmPassword: z.string().min(minPasswordLength, { message: 'Required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function Login() {
  const { registerAndLogin } = useAuth()

  const [Form, methods] = useForm<{
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ confirmPassword: _, ...data }) => {
      registerAndLogin(data)
    },
  })

  return (
    <Container className="flex h-screen items-center justify-center overflow-hidden">
      <Paper w={px('28rem')} withBorder shadow="md" p={px('3rem')} radius="md">
        <Center pb={px('3rem')}>
          <Image src="logo.svg" alt="logo" width={px('13rem')} height={0} />
        </Center>
        <Form>
          <Stack>
            <Flex gap="md">
              <TextInput name="lastName" label="姓" />
              <TextInput name="firstName" label="名" />
            </Flex>
            <TextInput type="email" name="email" label="メールアドレス" />
            <PasswordInput name="password" label="パスワード" />
            <PasswordInput
              name="confirmPassword"
              label="パスワード（確認用）"
            />
            <Form.SubmitButton mt="sm" loading={methods.formState.isSubmitting}>
              {methods.formState.isSubmitting ? '作成中' : '新規作成'}
            </Form.SubmitButton>
          </Stack>
        </Form>
        <Divider my="xl" />
        <Link href="/login">
          <Button fullWidth variant="outline">
            ログイン画面に戻る
          </Button>
        </Link>
      </Paper>
    </Container>
  )
}
