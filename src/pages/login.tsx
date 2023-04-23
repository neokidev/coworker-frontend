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
import { useCallback, useState } from 'react'

const testUserEmail = 'testuser@email.com'
const testUserPassword = 'password'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Required' })
    .email({ message: 'Wrong Format' }),
  password: z.string().min(8),
})

export default function Login() {
  const [isLoginButtonClicked, setIsLoginButtonClicked] = useState(false)

  const handleLoginError = useCallback(() => {
    setIsLoginButtonClicked(false)
  }, [])

  const { login } = useAuth({
    onLoginError: handleLoginError,
  })

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
      setIsLoginButtonClicked(true)
      login(data)
    },
  })

  const loginAsTestUser = useCallback(() => {
    setIsLoginButtonClicked(true)
    login({
      email: testUserEmail,
      password: testUserPassword,
    })
  }, [login])

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
            <Form.SubmitButton mt="sm" disabled={isLoginButtonClicked}>
              {methods.formState.isSubmitting ? 'ログイン中' : 'ログイン'}
            </Form.SubmitButton>
          </Stack>
        </Form>
        <Divider my="xl" />
        <Stack spacing="xl">
          <Button
            disabled={isLoginButtonClicked}
            fullWidth
            variant="outline"
            onClick={loginAsTestUser}
          >
            テストユーザでログイン
          </Button>
          <Link href="/register">
            <Button disabled={isLoginButtonClicked} fullWidth variant="outline">
              アカウントを新規作成
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Container>
  )
}
