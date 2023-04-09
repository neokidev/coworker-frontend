import {
  getGetMembersQueryKey,
  useGetMembers as useGetMembersQuery,
} from '@/api/endpoints/members/members'
import { useDeleteMembers as useDeleteMembersMutation } from '@/api/endpoints/members/members'
import { useDeleteMembersId as useDeleteMemberMutation } from '@/api/endpoints/members/members'
import { usePostMembers as usePostMemberMutation } from '@/api/endpoints/members/members'
import { usePutMembersId as usePutMemberMutation } from '@/api/endpoints/members/members'
import {
  ApiCreateMemberRequest,
  ApiListMembersResponse,
  ApiListMembersResponseMeta,
  ApiUpdateMemberRequestBody,
} from '@/api/model'
import { AxiosResponse } from 'axios'
import { Camelized } from 'humps'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DeepRequired } from 'ts-essentials'

export interface Member {
  id: string
  fullName: string
  email: string
  dateAdded: Date
}

export interface QueryResultData {
  meta: Camelized<Required<ApiListMembersResponseMeta>>
  data: Member[]
}

const transformer = (
  response: AxiosResponse<Camelized<DeepRequired<ApiListMembersResponse>>, any>
): QueryResultData => {
  return {
    meta: response.data.meta,
    data: response.data.data.map(
      ({ id, firstName, lastName, email, createdAt }) => {
        return {
          id: id,
          fullName: `${firstName} ${lastName}`,
          email: email,
          dateAdded: new Date(createdAt),
        }
      }
    ),
  }
}

export const useGetMembers = (page: number, pageSize: number) => {
  return useGetMembersQuery<QueryResultData>(
    { page_id: page, page_size: pageSize },
    { query: { select: transformer, keepPreviousData: true } }
  )
}

export const useCreateMember = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const mutation = usePostMemberMutation({
    mutation: {
      onSuccess,
    },
  })

  const createMember = useCallback(
    (data: Camelized<ApiCreateMemberRequest>) => {
      mutation.mutate({
        data,
      })
    },
    [mutation]
  )

  return { createMember }
}

export const useUpdateMember = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const mutation = usePutMemberMutation({
    mutation: {
      onSuccess,
    },
  })

  const updateMember = useCallback(
    (id: string, data: Camelized<ApiUpdateMemberRequestBody>) => {
      mutation.mutate({
        id,
        data,
      })
    },
    [mutation]
  )

  return { updateMember }
}

export const useDeleteMember = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const mutation = useDeleteMemberMutation({
    mutation: {
      onSuccess,
    },
  })

  const deleteMember = useCallback(
    (id: string) => {
      mutation.mutate({ id })
    },
    [mutation]
  )

  return { deleteMember }
}

export const useDeleteMembers = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const mutation = useDeleteMembersMutation({
    mutation: {
      onSuccess,
    },
  })

  const deleteMembers = useCallback(
    (ids: string[]) => {
      mutation.mutate({ params: { ids: ids.join(',') } })
    },
    [mutation]
  )

  return { deleteMembers }
}
