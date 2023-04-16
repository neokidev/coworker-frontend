import {
  usePostUsers,
  usePostUsersLogin,
  usePostUsersLogout,
} from '@/api/endpoints/users/users'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

interface LoginParams {
  email: string
  password: string
}

interface RegisterParams {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const useAuth = () => {
  const router = useRouter()

  const loginMutation = usePostUsersLogin({
    mutation: {
      onSuccess: () => {
        router.push('/')
        console.log('onsuccess login')
      },
      onError: () => {
        alert('ログインに失敗しました')
      },
    },
    request: { withCredentials: true },
  })
  const logoutMutation = usePostUsersLogout({
    mutation: {
      onSuccess: () => {
        router.push('/login')
        console.log('onsuccess logout')
      },
    },
    request: { withCredentials: true },
  })
  const registerMutation = usePostUsers({
    request: { withCredentials: true },
  })

  const login = useCallback(
    ({ email, password }: LoginParams) => {
      loginMutation.mutate({ data: { email, password } })
    },
    [loginMutation]
  )

  const logout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  const registerAndLogin = useCallback(
    async ({ email, password, firstName, lastName }: RegisterParams) => {
      await registerMutation
        .mutateAsync({
          data: {
            email,
            password,
            firstName,
            lastName,
          },
        })
        .then(() => login({ email, password }))
        .catch((error) => {
          console.error(error)
        })
    },
    [registerMutation, login]
  )

  return { login, logout, registerAndLogin }
}
