import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import ToggleTable from './components/ToggleTable'
import PropTypes from 'prop-types'
import { useField } from './custom_hooks/hooks'

import { useDispatch } from 'react-redux'
import { initNoti, setNoti } from '../src/reducers/notiReducer'
import { initBlogs } from './reducers/blogReducer'

const App = ({blogsinit}) => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      dispatch(setNoti('Logged', 'noti', 3000))
      setTimeout(() => {
        dispatch(initNoti())
      }, 2000)
    } catch (exception) {
      dispatch(setNoti('Error dkm', 'error', 3000))
      setTimeout(() => {
        dispatch(initNoti())
      }, 3000)
    }
  }

  const logout = () => {
    setUser(null)
    dispatch(setNoti('Log out', 'noti', 3000))
    window.localStorage.removeItem('loggedUser')
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        <ToggleTable buttonLable='login'>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
        </ToggleTable>
      ) : (
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={logout}>Log out</button>
          <ToggleTable buttonLable='Create new blog' ref={blogFormRef}>
            <BlogForm />
          </ToggleTable>
          <Blog
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default App

ToggleTable.propTypes = {
  buttonLable: PropTypes.string.isRequired
}
