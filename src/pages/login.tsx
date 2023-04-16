import { Checkbox, Paper, Container, Group, Center, Stack } from '@mantine/core'
import Image from 'next/image'
import { useAuth } from '@/features/auth'
import { PasswordInput, TextInput, useForm } from '@/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Required' })
    .email({ message: 'Wrong Format' }),
  password: z.string().min(1, { message: 'Required' }),
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
    onSubmit: ({ email, password }) => {
      login(email, password)
    },
  })

  return (
    <Container className="flex h-screen items-center justify-center overflow-hidden">
      <Paper className="w-[28rem]" withBorder shadow="md" p={48} radius="md">
        <Center pb={32}>
          <Image src="logo.svg" alt="logo" width={192} height={0} />
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
      </Paper>
    </Container>
  )
}
