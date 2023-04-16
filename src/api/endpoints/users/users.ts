/**
 * Generated by orval v6.12.0 🍺
 * Do not edit manually.
 * Coworker API
 * OpenAPI spec version: 0.0.1
 */
import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query'
import type {
  ApiUserResponse,
  ApiErrorResponse,
  ApiCreateUserRequest,
  ApiLoginUserResponse,
  ApiLoginUserRequest,
} from '../../model'
import { customInstance } from '../../custom-instance'
import type { ErrorType, BodyType } from '../../custom-instance'

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never

/**
 * @summary Create user
 */
export const postUsers = (
  apiCreateUserRequest: BodyType<ApiCreateUserRequest>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ApiUserResponse>(
    {
      url: `/users`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: apiCreateUserRequest,
    },
    options
  )
}

export type PostUsersMutationResult = NonNullable<
  Awaited<ReturnType<typeof postUsers>>
>
export type PostUsersMutationBody = BodyType<ApiCreateUserRequest>
export type PostUsersMutationError = ErrorType<ApiErrorResponse>

export const usePostUsers = <
  TError = ErrorType<ApiErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    { data: BodyType<ApiCreateUserRequest> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postUsers>>,
    { data: BodyType<ApiCreateUserRequest> }
  > = (props) => {
    const { data } = props ?? {}

    return postUsers(data, requestOptions)
  }

  return useMutation<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    { data: BodyType<ApiCreateUserRequest> },
    TContext
  >(mutationFn, mutationOptions)
}
/**
 * @summary Login user
 */
export const postUsersLogin = (
  apiLoginUserRequest: BodyType<ApiLoginUserRequest>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ApiLoginUserResponse>(
    {
      url: `/users/login`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: apiLoginUserRequest,
    },
    options
  )
}

export type PostUsersLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof postUsersLogin>>
>
export type PostUsersLoginMutationBody = BodyType<ApiLoginUserRequest>
export type PostUsersLoginMutationError = ErrorType<ApiErrorResponse>

export const usePostUsersLogin = <
  TError = ErrorType<ApiErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsersLogin>>,
    TError,
    { data: BodyType<ApiLoginUserRequest> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postUsersLogin>>,
    { data: BodyType<ApiLoginUserRequest> }
  > = (props) => {
    const { data } = props ?? {}

    return postUsersLogin(data, requestOptions)
  }

  return useMutation<
    Awaited<ReturnType<typeof postUsersLogin>>,
    TError,
    { data: BodyType<ApiLoginUserRequest> },
    TContext
  >(mutationFn, mutationOptions)
}
/**
 * @summary Logout user
 */
export const postUsersLogout = (
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ApiLoginUserResponse>(
    { url: `/users/logout`, method: 'post' },
    options
  )
}

export type PostUsersLogoutMutationResult = NonNullable<
  Awaited<ReturnType<typeof postUsersLogout>>
>

export type PostUsersLogoutMutationError = ErrorType<ApiErrorResponse>

export const usePostUsersLogout = <
  TError = ErrorType<ApiErrorResponse>,
  TVariables = void,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsersLogout>>,
    TError,
    TVariables,
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postUsersLogout>>,
    TVariables
  > = () => {
    return postUsersLogout(requestOptions)
  }

  return useMutation<
    Awaited<ReturnType<typeof postUsersLogout>>,
    TError,
    TVariables,
    TContext
  >(mutationFn, mutationOptions)
}
/**
 * @summary Get logged in user
 */
export const getUsersMe = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ApiUserResponse>(
    { url: `/users/me`, method: 'get', signal },
    options
  )
}

export const getGetUsersMeQueryKey = () => [`/users/me`]

export type GetUsersMeQueryResult = NonNullable<
  Awaited<ReturnType<typeof getUsersMe>>
>
export type GetUsersMeQueryError = ErrorType<ApiErrorResponse>

export const useGetUsersMe = <
  TData = Awaited<ReturnType<typeof getUsersMe>>,
  TError = ErrorType<ApiErrorResponse>
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersMe>>, TError, TData>
  request?: SecondParameter<typeof customInstance>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetUsersMeQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersMe>>> = ({
    signal,
  }) => getUsersMe(requestOptions, signal)

  const query = useQuery<Awaited<ReturnType<typeof getUsersMe>>, TError, TData>(
    { queryKey, queryFn, ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryKey

  return query
}
