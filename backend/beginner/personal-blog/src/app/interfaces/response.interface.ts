export default interface IResponse<T = {}> {
  success: boolean,
  message: string,
  payload?: T | T[]
}