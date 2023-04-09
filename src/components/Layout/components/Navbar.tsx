import {
  Navbar as MantineNavbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
} from '@mantine/core'
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react'
import { LinksGroup } from './NavbarLinksGroup'
import { IconTable, IconUser } from '@tabler/icons'

// const mockdata = [
//   { label: 'Dashboard', icon: IconGauge },
//   {
//     label: 'Market news',
//     icon: IconNotes,
//     initiallyOpened: true,
//     links: [
//       { label: 'Overview', link: '/' },
//       { label: 'Forecasts', link: '/' },
//       { label: 'Outlook', link: '/' },
//       { label: 'Real time', link: '/' },
//     ],
//   },
//   {
//     label: 'Releases',
//     icon: IconCalendarStats,
//     links: [
//       { label: 'Upcoming releases', link: '/' },
//       { label: 'Previous releases', link: '/' },
//       { label: 'Releases schedule', link: '/' },
//     ],
//   },
//   { label: 'Analytics', icon: IconPresentationAnalytics },
//   { label: 'Contracts', icon: IconFileAnalytics },
//   { label: 'Settings', icon: IconAdjustments },
//   {
//     label: 'Security',
//     icon: IconLock,
//     links: [
//       { label: 'Enable 2FA', link: '/' },
//       { label: 'Change password', link: '/' },
//       { label: 'Recovery codes', link: '/' },
//     ],
//   },
// ]

const menus = [
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

export function Navbar() {
  const { classes } = useStyles()
  const links = menus.map((item) => <LinksGroup {...item} key={item.label} />)

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
