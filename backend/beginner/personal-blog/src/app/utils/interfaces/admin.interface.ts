export default interface IUser {
  id?: number,
  user?: string,
  email?: string,
  password: string
}

export type TUserKeys = 'user' | 'email' | 'password';