import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

import type { BaseUser, User } from '@/typings'

// Define a type for the slice state
interface UsersState {
  allUsers: User[]
  currentUser: null | User
}

// Define the initial state using that type
const initialState: UsersState = {
  allUsers: [],
  currentUser: null
}

export const usersSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<BaseUser>) => {
      const { username, firstName, password } = action.payload
      const newUser = {
        id: state.allUsers.length + 1,
        username,
        firstName,
        password
      }
      state.allUsers.push(newUser)
      usersSlice.caseReducers.loginUser(state, {
        payload: newUser,
        type: usersSlice.actions.loginUser.type
      })
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = { ...action.payload }
    },
    logoutUser: (state) => {
      state.currentUser = null
    }
  }
})

export const { addUser, loginUser, logoutUser } = usersSlice.actions

export const getAllUsers = (state: RootState) => state.users.allUsers
export const getCurrentUser = (state: RootState) => state.users.currentUser

export default usersSlice.reducer