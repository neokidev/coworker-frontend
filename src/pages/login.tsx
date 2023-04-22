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
} from '@mantine/core'
import Image from 'next/image'
import { useAuth } from '@/features/auth'
import { PasswordInput, TextInput, useForm } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Required' })
    .email({ message: 'Wrong Format' }),
  password: z.string().min(8),
})

export default function Login() {
  const { login } = useAuth()

  const [Form, methods] = useForm<{
    email: string
    password: string
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => {
      login(data)
    },
  })

  return (
    <Container className="flex h-screen items-center justify-center overflow-hidden">
      <Paper w={px('26rem')} withBorder shadow="md" p={px('3rem')} radius="md">
        <Center pb={px('3rem')}>
          <Image src="logo.svg" alt="logo" width={px('13rem')} height={0} />
        </Center>
        <Form>
          <Stack>
            <TextInput type="email" name="email" label="メールアドレス" />
            <PasswordInput name="password" label="パスワード" />
            <Group position="apart" mt="sm">
              <Checkbox label="ログインを保存する" sx={{ lineHeight: 1 }} />
            </Group>
            <Form.SubmitButton mt="sm" loading={methods.formState.isSubmitting}>
              {methods.formState.isSubmitting ? 'ログイン中' : 'ログイン'}
            </Form.SubmitButton>
          </Stack>
        </Form>
        <Divider my="xl" />
        <Link href="/register">
          <Button fullWidth variant="outline">
            アカウントを新規作成
          </Button>
        </Link>
      </Paper>
    </Container>
  )
}
