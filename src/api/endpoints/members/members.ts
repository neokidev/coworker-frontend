/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Coworker API
 * OpenAPI spec version: 0.0.1
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type {
  ApiMemberResponse,
  ApiErrorResponse,
  GetMembersParams,
  ApiCreateMemberRequest,
  ApiUpdateMemberRequestBody,
} from "../../model";
import { customInstance } from "../../custom-instance";
import type { ErrorType, BodyType } from "../../custom-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

/**
 * @summary List members
 */
export const getMembers = (
  params: GetMembersParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ApiMemberResponse[]>(
    { url: `/members`, method: "get", params, signal },
    options
  );
};

export const getGetMembersQueryKey = (params: GetMembersParams) => [
  `/members`,
  ...(params ? [params] : []),
];

export type GetMembersQueryResult = NonNullable<
  Awaited<ReturnType<typeof getMembers>>
>;
export type GetMembersQueryError = ErrorType<ApiErrorResponse>;

export const useGetMembers = <
  TData = Awaited<ReturnType<typeof getMembers>>,
  TError = ErrorType<ApiErrorResponse>
>(
  params: GetMembersParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getMembers>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetMembersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMembers>>> = ({
    signal,
  }) => getMembers(params, requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof getMembers>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary Create member
 */
export const postMembers = (
  apiCreateMemberRequest: BodyType<ApiCreateMemberRequest>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ApiMemberResponse>(
    {
      url: `/members`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: apiCreateMemberRequest,
    },
    options
  );
};

export type PostMembersMutationResult = NonNullable<
  Awaited<ReturnType<typeof postMembers>>
>;
export type PostMembersMutationBody = BodyType<ApiCreateMemberRequest>;
export type PostMembersMutationError = ErrorType<ApiErrorResponse>;

export const usePostMembers = <
  TError = ErrorType<ApiErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postMembers>>,
    TError,
    { data: BodyType<ApiCreateMemberRequest> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postMembers>>,
    { data: BodyType<ApiCreateMemberRequest> }
  > = (props) => {
    const { data } = props ?? {};

    return postMembers(data, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof postMembers>>,
    TError,
    { data: BodyType<ApiCreateMemberRequest> },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * @summary Delete member
 */
export const deleteMembersId = (
  id: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    { url: `/members/${id}`, method: "delete" },
    options
  );
};

export type DeleteMembersIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteMembersId>>
>;

export type DeleteMembersIdMutationError = ErrorType<ApiErrorResponse>;

export const useDeleteMembersId = <
  TError = ErrorType<ApiErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteMembersId>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteMembersId>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return deleteMembersId(id, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof deleteMembersId>>,
    TError,
    { id: string },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * @summary Get member
 */
export const getMembersId = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ApiMemberResponse>(
    { url: `/members/${id}`, method: "get", signal },
    options
  );
};

export const getGetMembersIdQueryKey = (id: string) => [`/members/${id}`];

export type GetMembersIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getMembersId>>
>;
export type GetMembersIdQueryError = ErrorType<ApiErrorResponse>;

export const useGetMembersId = <
  TData = Awaited<ReturnType<typeof getMembersId>>,
  TError = ErrorType<ApiErrorResponse>
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getMembersId>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetMembersIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMembersId>>> = ({
    signal,
  }) => getMembersId(id, requestOptions, signal);

  const query = useQuery<
    Awaited<ReturnType<typeof getMembersId>>,
    TError,
    TData
  >(queryKey, queryFn, { enabled: !!id, ...queryOptions }) as UseQueryResult<
    TData,
    TError
  > & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary Update member
 */
export const putMembersId = (
  id: string,
  apiUpdateMemberRequestBody: BodyType<ApiUpdateMemberRequestBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ApiMemberResponse>(
    {
      url: `/members/${id}`,
      method: "put",
      headers: { "Content-Type": "application/json" },
      data: apiUpdateMemberRequestBody,
    },
    options
  );
};

export type PutMembersIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof putMembersId>>
>;
export type PutMembersIdMutationBody = BodyType<ApiUpdateMemberRequestBody>;
export type PutMembersIdMutationError = ErrorType<ApiErrorResponse>;

export const usePutMembersId = <
  TError = ErrorType<ApiErrorResponse>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putMembersId>>,
    TError,
    { id: string; data: BodyType<ApiUpdateMemberRequestBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putMembersId>>,
    { id: string; data: BodyType<ApiUpdateMemberRequestBody> }
  > = (props) => {
    const { id, data } = props ?? {};

    return putMembersId(id, data, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof putMembersId>>,
    TError,
    { id: string; data: BodyType<ApiUpdateMemberRequestBody> },
    TContext
  >(mutationFn, mutationOptions);
};
