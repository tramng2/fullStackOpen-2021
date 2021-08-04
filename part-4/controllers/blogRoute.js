const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')

blogRouter.get('/', async (request, response) => {
  const notes = await Blog.find({}).populate('user',{username: 1})
  response.json(notes)
})
  

//need to change to async await 
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log('body', body)
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
    user: user._id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async (request, response,next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
      response.json(blog)
    } else {
      response.status(400).end()
    }
  } catch(error) { next(error)}
})


blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  } 
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
