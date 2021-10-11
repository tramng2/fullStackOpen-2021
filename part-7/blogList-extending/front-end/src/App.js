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
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const userLoginInfo = useSelector(state => state.login)
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const logout = () => {
    // setUser(null)
    dispatch(setNoti('Log out', 'noti', 3000))
    window.localStorage.removeItem('loggedUser')
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
          <button onClick={logout}>Log out</button>
          <ToggleTable buttonLable='Create new blog' ref={blogFormRef}>
            <BlogForm />
          </ToggleTable>
          <Blog user={userLoginInfo} />
        </div>
      )}
    </div>
  )
}

export default App

ToggleTable.propTypes = {
  buttonLable: PropTypes.string.isRequired
}
