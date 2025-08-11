export default interface IAdmin {
  user?: string,
  email?: string,
  password: string
}

export type TAdminKeys = 'user' | 'email' | 'password';