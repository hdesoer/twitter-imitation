import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/hooks'
import { logoutUser } from '@/states/usersSlice'

const Header = ({ firstName }: { firstName: string }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return <nav  className="navbar bg-light">
    <div  className="container-fluid">
      <a  className="navbar-brand">Twitter</a>
      <div className='d-flex'>
        <span className="navbar-text me-2">{ firstName }</span>
        <button className="btn btn-outline-primary" onClick={onLogout}>Logout</button>
      </div>
    </div>
  </nav>
}

export default Header