const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userSchema')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  //token will exprired in 1 hour, after that user need to login again to get a new token.
  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter