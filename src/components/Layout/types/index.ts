import { FC } from 'react'

export type NavbarLink = {
  label: string
  link: string
}

export type NavbarLinksGroup = {
  label: string
  icon: FC<any>
  links: NavbarLink[]
}
