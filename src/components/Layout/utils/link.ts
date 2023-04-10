import { NavbarLinksGroup } from '@/components/Layout/types'

function isCurrentPathStartsWith(currentPath: string, targetPath: string) {
  return currentPath !== null ? currentPath.startsWith(targetPath) : false
}

export function findActiveLink(
  currentPath: string,
  linksGroups: NavbarLinksGroup[]
): string | undefined {
  for (const item of linksGroups) {
    if (!Array.isArray(item.links)) {
      continue
    }

    for (const link of item.links) {
      if (isCurrentPathStartsWith(currentPath, link.link)) {
        return link.link
      }
    }
  }

  return undefined
}

export function hasActiveLink(
  activeLink: string,
  linksGroup: NavbarLinksGroup
): boolean {
  if (!Array.isArray(linksGroup.links)) {
    return false
  }
  return linksGroup.links.some((link) => link.link === activeLink)
}
