import { ApiUserResponse } from '@/api/model'
import { Camelized } from 'humps'

export interface HasId<T> {
  id: T
}

export type HasIdObject = object & HasId<string>

export interface Session {
  user?: Required<Camelized<ApiUserResponse>>
}
