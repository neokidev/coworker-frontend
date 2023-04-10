import {
  Navbar as MantineNavbar,
  ScrollArea,
  createStyles,
  rem,
} from '@mantine/core'
import { LinksGroup } from './NavbarLinksGroup'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { navbarItems } from '@/components/Layout/navbarItems'
import { findActiveLink, hasActiveLink } from '@/components/Layout/utils/link'

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
  const pathname = usePathname()
  const [activeLink] = useState<string | undefined>(
    pathname !== null ? findActiveLink(pathname, navbarItems) : undefined
  )

  const { classes } = useStyles()
  const links = navbarItems.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      activeLink={activeLink}
      initiallyOpened={
        activeLink !== undefined && hasActiveLink(activeLink, item)
      }
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
