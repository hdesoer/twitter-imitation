export interface BaseUser {
  username: string
  firstName: string
  password: string
}

export interface User extends BaseUser {
  id: number
}