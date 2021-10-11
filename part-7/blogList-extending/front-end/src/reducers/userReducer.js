import userService from '../services/user'
const loggedInUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))

const initialState = loggedInUserJSON ? loggedInUserJSON : null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'SET_USER':
        console.log(action.data)
      return action.data
    default:
      return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const userInit = await userService.getAllUser()
    dispatch({
      type: 'INIT_USERS',
      data: userInit
    })
  }
}
export const setUser = user => ({
  type: 'SET_USER',
  data: user
})
export default userReducer
