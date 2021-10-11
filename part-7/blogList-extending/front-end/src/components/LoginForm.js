import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNoti } from '../reducers/notiReducer'
export default function LoginForm () {
  const dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()
    const userLoginInfo = {
      username: event.target.username.value,
      password: event.target.password.value
    }  
    dispatch(login(userLoginInfo))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input name='username' />
        </div>
        <div>
          password
          <input type='password' name='password' />
        </div>
        <button type='submit' id='login-button'>
          login
        </button>
      </form>
    </div>
  )
}
