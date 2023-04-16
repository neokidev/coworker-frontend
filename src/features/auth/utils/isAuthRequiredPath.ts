const unauthenticatedPages = ['/login', '/register']

export function isAuthRequiredPath(pathname: string): boolean {
  return !unauthenticatedPages.includes(pathname)
}
