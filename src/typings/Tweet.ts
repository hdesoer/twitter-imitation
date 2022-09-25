import type { User } from './User'
export interface Tweet {
  id: number
  text: string
  createdAt: string
  user: User
  isDeleted?: boolean
}