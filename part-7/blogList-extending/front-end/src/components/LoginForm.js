import React from 'react'
import PropTypes from 'prop-types'
export default function LoginForm({
  handleSubmit,
  username,
  password,
})

{
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          password
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}