import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import ToggleTable from './components/ToggleTable'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { initNoti, setNoti } from '../src/reducers/notiReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { login, logout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const userLoginInfo = useSelector(state => state.login)
  const userLocalStore = useSelector(state => state.user)
  let user
  if (userLocalStore) {
    user = userLocalStore
  } else {
    user = userLoginInfo
  }

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  useEffect(() => {
    if (loggedUserJSON) {
      const userLocal = JSON.parse(loggedUserJSON)
      blogService.setToken(userLocal.token)
    }
  }, [loggedUserJSON])

  const handleLogout = async event => {
    event.preventDefault()
    dispatch(setNoti('Log out', 'noti', 3000))
    dispatch(logout())
    // dispatch(setUser(null))
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        <ToggleTable buttonLable='login'>
          <LoginForm />
        </ToggleTable>
      ) : (
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={handleLogout}>Log out</button>
          <ToggleTable buttonLable='Create new blog'>
            <BlogForm />
          </ToggleTable>
          <Blog user={user}/>
        </div>
      )}
    </div>
  )
}

export default App

ToggleTable.propTypes = {
  buttonLable: PropTypes.string.isRequired
}
