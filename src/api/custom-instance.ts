import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { Camelized, camelizeKeys, decamelizeKeys } from 'humps'
import { DeepRequired } from 'ts-essentials'

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Axios middleware to convert all api responses to camelCase
AXIOS_INSTANCE.interceptors.response.use((response) => {
  if (
    response.data &&
    response.headers['content-type'] === 'application/json'
  ) {
    response.data = camelizeKeys(response.data)
  }
  return response
})

// Axios middleware to convert all api requests to snake_case
AXIOS_INSTANCE.interceptors.request.use((config) => {
  const newConfig = { ...config }
  if (newConfig.headers?.['Content-Type'] === 'multipart/form-data')
    return newConfig
  if (config.params) {
    newConfig.params = decamelizeKeys(config.params)
  }
  if (config.data) {
    newConfig.data = decamelizeKeys(config.data)
  }

  // Most APIs require authentication, so set withCredentials to true to include cookies for authorization
  newConfig.withCredentials = true
  return newConfig
})

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<Camelized<DeepRequired<T>>, any>> => {
  return AXIOS_INSTANCE.request({ ...config, ...options })
}

// // In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>
// // In case you want to wrap the body type (optional)
// // (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = Camelized<BodyData>
