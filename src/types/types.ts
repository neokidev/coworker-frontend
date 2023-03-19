export interface HasId<T> {
  id: T
}

export type HasIdObject = object & HasId<string>
