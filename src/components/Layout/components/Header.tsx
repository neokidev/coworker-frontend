import { Header as MantineHeader, Menu, Button } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import { useSession } from '@/providers/session'
import { useAuth } from '@/features/auth'

export function Header() {
  const { user } = useSession()
  const { logout } = useAuth()

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

            <Menu shadow="md" position="bottom-end" width={200}>
              <Menu.Target>
                <button className="flex items-center justify-center space-x-2 bg-transparent">
                  <UserIcon className="h-7 w-7 rounded-full bg-gray-500 p-1 text-white" />
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-600">
                      {`${user?.lastName} ${user?.firstName}`}
                    </span>
                    <ChevronDownIcon
                      className="h-3 w-3 translate-y-0.5 text-gray-500"
                      strokeWidth={3}
                    />
                  </div>
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={logout}>ログアウト</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
    </MantineHeader>
  )
}
