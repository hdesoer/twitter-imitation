import {
  createBrowserRouter,
  Link
} from 'react-router-dom'

import LoginPage, { loginAction } from '@/pages/login'
import HomePage from '@/pages/home'
import AuthRequiredLayout from '@/layouts/layout'
import App from '@/App'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: ":username",
    element: <AuthRequiredLayout>
      <HomePage />
    </AuthRequiredLayout>,
  },
])

export default router