import { store } from '@/store'
import { getAllTweets } from '@/states/tweetsSlice'

export const fakeGetTweetById = (tweetId: number) => {
  return getAllTweets(store.getState()).find(item => item.id === tweetId)
}