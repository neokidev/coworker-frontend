import { NavbarLinksGroup } from '@/components/Layout/types'
import { IconTable, IconUser } from '@tabler/icons'
import { IconCalendarStats } from '@tabler/icons-react'

export const navbarItems: NavbarLinksGroup[] = [
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
