export default interface IResponse<T = {}> {
  success: boolean,
  message: string,
  payload?: T | T[]
}

export interface IError<T = null> {
  error: string | null,
  payload?: T | T[] | null
}