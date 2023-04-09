import { AppShell as MantineAppShell, Box, Title } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { Header, Navbar } from './components'

type MainLayoutProps = {
  title: string
  px?: number
  maw?: number
  miw?: number
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({
  title,
  px = 80,
  maw,
  miw,
  children,
}) => {
  return (
    <MantineAppShell
      padding="md"
      header={<Header />}
      navbar={<Navbar />}
      styles={(theme) => ({
        main: {
          minWidth: miw,
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <main>
        <Box
          mx="auto"
          px={px}
          sx={{
            maxWidth: maw,
          }}
        >
          <Title order={2} my={16}>
            {title}
          </Title>
          {children}
        </Box>
      </main>
    </MantineAppShell>
  )
}
