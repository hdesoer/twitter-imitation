import React from 'react'
import {
  createBrowserRouter,
} from 'react-router-dom'

import LoginPage, { loginAction } from '@/pages/login'
import HomePage from '@/pages/home'
import TweetDetailPage from '@/pages/tweet'
import AuthRequiredLayout from '@/layouts/layout'

import { fakeGetTweetById } from '@/services/tweet'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: ':username',
    element: <AuthRequiredLayout>
      <HomePage />
    </AuthRequiredLayout>,
  },
  {
    path: 'tweet/:tweetId',
    element: <AuthRequiredLayout>
      <TweetDetailPage />
    </AuthRequiredLayout>,
    loader: ({ params }) => {
      return fakeGetTweetById(Number(params.tweetId))
    }
  }
])

export default router