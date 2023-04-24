import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from '@/providers/session'
import { getUsersMe } from '@/api/endpoints/users/users'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Session } from '@/types/types'
import { isAuthRequiredPath } from '@/features/auth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function MyApp({
  Component,
  pageProps,
}: AppProps & { session: Session }) {
  const router = useRouter()
  const [session, setSession] = useState<Session | undefined>(undefined)

  useEffect(() => {
    getUsersMe()
      .then((response) => {
        setSession({ user: response.data })
        if (!isAuthRequiredPath(router.pathname)) {
          router.push('/')
        }
      })
      .catch(() => {
        setSession({ user: undefined })
        if (isAuthRequiredPath(router.pathname)) {
          router.push('/login')
        }
      })
  }, [router])

  if (
    session === undefined ||
    (session.user === undefined && isAuthRequiredPath(router.pathname)) ||
    (session.user !== undefined && !isAuthRequiredPath(router.pathname))
  ) {
    return null
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
