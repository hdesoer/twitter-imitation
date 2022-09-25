import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

import type { Tweet } from '@/typings'

interface UsersState {
  tweets: Tweet[]
}

const initialState: UsersState = {
  tweets: [],
}

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    addTweet: (state, action: PayloadAction<Omit<Tweet, 'id'>>) => {
      state.tweets.unshift({
        ...action.payload,
        id: state.tweets.length + 1
      })
    },
    deleteTweet: (state, action: PayloadAction<number>) => {
      state.tweets.filter(item => item.id === action.payload).forEach(
        item => item.isDeleted = true
      )
    },
    editTweet: (state, action: PayloadAction<{ tweetId: number, text: string }>) => {
      const { tweetId, text } = action.payload
      state.tweets.filter(item => item.id === tweetId).forEach(
        item => item.text = text
      )
    }
  }
})

export const { addTweet, deleteTweet, editTweet } = tweetsSlice.actions

export const getAllTweets = (state: RootState) => state.tweets.tweets.filter(item => !item.isDeleted)

export default tweetsSlice.reducer