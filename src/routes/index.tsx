import React from 'react'
import {
  createBrowserRouter,
} from 'react-router-dom'

import LoginPage, { loginAction } from '@/pages/login'
import HomePage from '@/pages/home'
import AuthRequiredLayout from '@/layouts/layout'

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
])

export default router