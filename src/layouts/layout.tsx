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
    return <Navigate to="/" replace />
  }
  return <div className="vw-100 vh-100 d-flex flex-column">
    <Header firstName={currentUser.firstName} />
    <div style={{ minHeight: 'calc(100vh - 56px)', overflowY: 'scroll' }}>
      { children }
    </div>
  </div>
}

export default Layout