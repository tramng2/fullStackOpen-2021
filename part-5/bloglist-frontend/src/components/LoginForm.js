import React from 'react'
import PropTypes from 'prop-types'
export default function LoginForm({
  handleSubmit,
  username,
  handleUsernameChange,
  handlePasswordChange,
  password,
})

{
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          {' '}
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}