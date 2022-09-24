import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/hooks'
import Header from '@/layouts/components/Header'

type Props = {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  const currentUser = useAppSelector(state => state.users.currentUser)
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return <>
    <Header firstName={currentUser.firstName} />
    { children }
  </>
}

export default Layout