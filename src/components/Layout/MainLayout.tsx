import { AppShell as MantineAppShell, Box, Title } from '@mantine/core'
import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { UserIcon } from '@heroicons/react/24/solid'
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Header as MantineHeader } from '@mantine/core'
import Link from 'next/link'
import { Navbar, ScrollArea, createStyles } from '@mantine/core'
import { IconCalendarStats, IconTable, IconUser } from '@tabler/icons'
import { LinksGroup } from '@/components/Layout/NavbarLinksGroup'

const mockdata = [
  {
    label: 'アカウント',
    icon: IconUser,
    links: [
      { label: 'ログイン画面', link: '/login' },
      { label: 'アカウント設定', link: '/account-settings' },
      { label: 'カート', link: '/cart' },
    ],
  },
  {
    label: 'テーブル',
    icon: IconTable,
    links: [{ label: 'メンバー一覧', link: '/members' }],
  },
  { label: 'カレンダー（工事中）', icon: IconCalendarStats },
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
}))

const Header = () => {
  return (
    <MantineHeader
      height={64}
      px={32}
      className="border-b border-slate-200 bg-white"
    >
      <div className="flex h-full items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-start">
          <Link href="/" className="bg-transparent p-2">
            <Image src="logo.svg" alt="logo" width={104} height={0} />
          </Link>
        </div>
        <div className="flex h-full w-full items-center justify-end">
          <div className="flex items-center space-x-2">
            <button className="flex items-center justify-center bg-transparent">
              <BellIcon className="h-5 w-5 text-gray-500" />
            </button>

            <hr className="border-t text-gray-500" />

            <button className="flex items-center justify-center space-x-2 bg-transparent">
              <UserIcon className="h-7 w-7 rounded-full bg-gray-500 p-1 text-white" />
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-600">
                  山田 太郎
                </span>
                <ChevronDownIcon
                  className="h-3 w-3 translate-y-0.5 text-gray-500"
                  strokeWidth={3}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </MantineHeader>
  )
}

const Sidebar = () => {
  const { classes } = useStyles()
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <Navbar width={{ sm: 300 }} px="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  )
}

type MainLayoutProps = {
  title: string
  px?: number
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({
  title,
  px = 80,
  children,
}) => {
  return (
    <MantineAppShell
      padding="md"
      header={<Header />}
      navbar={<Sidebar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <main>
        <Box mx="auto" px={px}>
          <Title order={2} my={16}>
            {title}
          </Title>
          {children}
        </Box>
      </main>
    </MantineAppShell>
  )
}
