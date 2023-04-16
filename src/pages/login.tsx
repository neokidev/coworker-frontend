import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Container,
  Group,
  Button,
  Center,
} from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth'

export default function Login() {
  const router = useRouter()
  const { login, logout } = useAuth()

  const onClickLoginButton = () => {
    login('joe.yamada@example.com', 'my_name_is_joe_yamada')
    // router.push('/')
  }

  const onClickLogoutButton = () => {
    logout()
    // router.push('/')
  }

  return (
    <Container className="flex h-screen items-center justify-center overflow-hidden">
      <Paper className="w-[28rem]" withBorder shadow="md" p={48} radius="md">
        <Center pb={32}>
          <Image src="logo.svg" alt="logo" width={192} height={0} />
        </Center>
        <TextInput label="メールアドレス" required />
        <PasswordInput label="パスワード" required mt="md" />
        <Group position="apart" mt="xl">
          <Checkbox label="ログインを保存する" sx={{ lineHeight: 1 }} />
        </Group>
        <Button fullWidth mt="xl" onClick={onClickLoginButton}>
          ログイン
        </Button>
        <Button fullWidth mt="xl" onClick={onClickLogoutButton}>
          ログアウト
        </Button>
      </Paper>
    </Container>
  )
}
