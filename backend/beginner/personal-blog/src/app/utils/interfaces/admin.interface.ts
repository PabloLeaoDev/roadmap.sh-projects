export default interface IAdmin {
  id?: number,
  user?: string,
  email?: string,
  password: string
}

export type TAdminKeys = 'user' | 'email' | 'password';