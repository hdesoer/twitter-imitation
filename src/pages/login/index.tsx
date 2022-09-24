import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Form, redirect, useActionData } from 'react-router-dom'

import { addUser, loginUser, getAllUsers } from '@/states/usersSlice'
import { store } from '@/store' 
import s from './index.module.scss'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const actionMessages = useActionData() as Record<string, string> | undefined
  useEffect(() => {
    if(actionMessages) {
      setErrors(actionMessages)
    }
  }, [actionMessages])

  useEffect(() => {
    setErrors({})
  }, [isLogin])

  const onChangeAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsLogin(!isLogin)
  }

  return <div className={s.formContainer}>
    <Form method="post">
    <h1 className="h3 mb-3 fw-normal">Please {isLogin?'sign in':'sign up'}</h1>

    {
      errors?.alert && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        { errors.alert }
      </div>
    }

    <div className={classNames(s.formItem)}>
      <label 
        htmlFor="username" 
        className={classNames("form-label", s.formLabel)}
      >
        Username
      </label>
      <input type="text" name='username' className="form-control form-control-lg" id="username" placeholder="Username" />
      {
        errors?.username && <div className="form-text">{errors?.username}</div>
      }
    </div>
    {
      !isLogin && (
        <div className={classNames(s.formItem)}>
          <label 
            htmlFor="firstName" 
            className={classNames("form-label", s.formLabel)}
          >
            First Name
          </label>
          <input type="text" name='firstName' className="form-control form-control-lg" id="firstName" placeholder="First Name" />
          {
            errors?.firstName && <div className="form-text">{errors?.firstName}</div>
          }
        </div>
      )
    }
    <div className={classNames(s.formItem)}>
      <label 
        htmlFor="password" 
        className={classNames("form-label", s.formLabel)}
      >
        Password
      </label>
      <input name='password' className="form-control form-control-lg" id="password" placeholder="Password" />
      {
        errors?.password && <div className="form-text">{errors?.password}</div>
      }
    </div>

    <button 
      className="w-100 btn btn-lg btn-primary"
      type='submit'
    >
      Submit
    </button>
    <button 
      className={classNames("btn btn-link", s.changeActionBtn)}
      onClick={onChangeAction}
    >
      { isLogin?'Sign up':'Sign in' }
    </button>
  </Form>
</div>
}

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData()
  const username = formData.get("username") as string
  const firstName = formData.get("firstName") as string
  const password = formData.get("password") as string
  // firstName can be null or ''
  const isLogin = typeof firstName === 'object'
  const errors: Record<string, string> = {}
  if (!username) {
    errors.username = 'Please input username'
  }
  if (!password) {
    errors.password = 'Please input password'
  }
  
  if (!isLogin && !firstName) {
    errors.firstName = 'Please input firstName'
  }
  if (Object.keys(errors).length > 0) {
    return errors
  }

  const allUsers = getAllUsers(store.getState())
  if (isLogin) {
    // sign in
    const currentUser = allUsers.find(user => user.username === username && user.password === password)
    if (!currentUser) {
      errors.alert = 'Incorrect username or password'
      return errors
    } else {
      store.dispatch(loginUser({...currentUser}))
    }
  } else {
    // sign up
    if(allUsers.find(user => user.username === username)) {
      errors.username = 'username already exists'
      return errors
    }
    store.dispatch(addUser({
      username,
      firstName,
      password
    }))
  }
  
  return redirect(`/${username}`)
}

export default LoginPage