import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from '@/providers/session'
import { getUsersMe } from '@/api/endpoints/users/users'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
  session,
}: AppProps & { session: Session }) {
  const router = useRouter()

  useEffect(() => {
    if (isAuthRequiredPath(router.pathname) && session.user === undefined) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isAuthRequiredPath(router.pathname) && session.user === undefined) {
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

MyApp.getInitialProps = async (context: any) => {
  let session: Session = {}

  if (context.ctx.pathname !== '/login') {
    try {
      const response = await getUsersMe({
        withCredentials: true,
      })
      session.user = response.data
    } catch (error) {}
  }

  return {
    session,
  }
}
