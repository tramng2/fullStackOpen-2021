const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((notes) => {
    response.json(notes)
  })
})
  
blogRouter.post('/', (request, response, next) => {
  const body = request.body
  if (body.title === undefined || body.author === undefined  || body.url === undefined  ||body.likes === undefined) {
    return response.status(400).json({ error: 'Need to fill all required fields' })
  }
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author
  })
  blog
    .save()
    .then((savedBlog) => savedBlog.toJSON())
    .then((savedAndFormattedBlog) => {
      response.json(savedAndFormattedBlog)
    })
    .catch((error) => next(error))
})

blogRouter.get('/:id', (request, response,next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})


blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.content,
    url: body.url,
    likes: body.likes,
    author: body.author
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog)
    })
    .catch((error) => next(error))
})
module.exports = blogRouter
