import loginService from '../services/login'

import blogService from '../services/blogs'
const loginReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT': {
      return null
    }
    default:
      return state
  }
}

export const login = userInfo => {
  return async dispatch => {
    const user = await loginService.login({
      username: userInfo.username,
      password: userInfo.password
    })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer
