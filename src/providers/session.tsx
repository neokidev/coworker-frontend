import { createContext, useContext, ReactNode } from 'react'
import { Session } from '@/types/types'

const SessionContext = createContext<Session>({})

interface SessionProviderProps {
  session: Session
  children: ReactNode
}

export function SessionProvider({ session, children }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}
