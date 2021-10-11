import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNoti } from './notiReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return (state = action.data)
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = userInfo => {
  return async dispatch => {
    try {
      const userLogin = await loginService.login({
        username: userInfo.username,
        password: userInfo.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))
      blogService.setToken(userLogin.token)
      dispatch(setNoti('Log in', 'noti', 3000))
      dispatch({
        type: 'LOGIN',
        data: userLogin
      })
    } catch (error) {
      dispatch(setNoti('Wrong password or username', 'error', 3000))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT',
      user: null
    })
  }
}

export default loginReducer
