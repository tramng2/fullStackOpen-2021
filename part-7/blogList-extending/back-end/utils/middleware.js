const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'JsonWebTokenError' ) {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if(error.name === 'TokenExpiredError' ) {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

const tokenExtraction = (request, response, next) => {
  const authorization = request.get('authorization')

  // Check if there is a token and extract it
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  // Check if the token is valid
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.decodedToken = decodedToken
  } catch (error) {
    request.decodedToken = null
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtraction
}