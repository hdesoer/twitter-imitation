import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '@/states/counterSlice'
import usersReducer from '@/states/usersSlice'
import tweetsReducer from './states/tweetsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    tweets: tweetsReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch