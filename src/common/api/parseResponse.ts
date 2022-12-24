import {AxiosError, AxiosResponse} from "axios";

export enum ResultCode {
  SUCCESSFUL = 0,
  BAD_RESPONSE = 1,
  BAD_CAPTCHA = 10,
}

export type ResponseWithResultCodeType<T = {}> = {
  resultCode: ResultCode
  messages: string[]
  data: T
}

export const checkResultCodeAndGetData = <T>(res: ResponseWithResultCodeType<T>): Promise<T> => {
  const {data, messages, resultCode} = res
  if (resultCode === ResultCode.SUCCESSFUL) return Promise.resolve(data)
  else return Promise.reject(messages)
}

export type ResponseWithErrorType<T> = {
  totalCount: number
  error: string
  items: Array<T>
}

export const checkErrorAndGetItems = <T>(res: ResponseWithErrorType<T>): Promise<{ totalCount: number, items: Array<T> }> => {
  const {totalCount, items, error} = res
  if (error) return Promise.reject(error)
  return Promise.resolve({totalCount, items})
}

export const getDataFromAxiosResponse = <T>(res: AxiosResponse<T>): T => res.data
export const axiosErrorToString = (res: AxiosError) => Promise.reject(res.message)
