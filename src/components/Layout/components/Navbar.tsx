import {
  Navbar as MantineNavbar,
  ScrollArea,
  createStyles,
  rem,
} from '@mantine/core'
import { IconCalendarStats } from '@tabler/icons-react'
import { LinksGroup } from './NavbarLinksGroup'
import { IconTable, IconUser } from '@tabler/icons'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { NavbarLinksGroup } from '@/components/Layout/types'

const linkGroups: NavbarLinksGroup[] = [
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
  {
    label: 'カレンダー',
    icon: IconCalendarStats,
    links: [{ label: '工事中', link: '#' }],
  },
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

function isCurrentPathStartsWith(currentPath: string, targetPath: string) {
  return currentPath !== null ? currentPath.startsWith(targetPath) : false
}

export function Navbar() {
  const pathname = usePathname()

  const findActiveLink = useCallback((): string | undefined => {
    if (pathname === null) {
      return undefined
    }

    for (const item of linkGroups) {
      if (!Array.isArray(item.links)) {
        continue
      }

      for (const link of item.links) {
        if (isCurrentPathStartsWith(pathname, link.link)) {
          return pathname
        }
      }
    }

    return undefined
  }, [pathname])

  const [activeLink, setActiveLink] = useState<string | undefined>(
    findActiveLink()
  )

  const hasActiveLink = useCallback(
    (links: { label: string; link: string }[]) => {
      return links.some((link) => link.link === activeLink)
    },
    [activeLink]
  )

  const { classes } = useStyles()
  const links = linkGroups.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      initiallyOpened={Array.isArray(item.links) && hasActiveLink(item.links)}
      activeLink={activeLink}
    />
  ))

  return (
    <MantineNavbar width={{ base: 300 }} px="md" className={classes.navbar}>
      <MantineNavbar.Section
        grow
        className={classes.links}
        component={ScrollArea}
      >
        {links}
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}
