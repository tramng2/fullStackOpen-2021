const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

blogRouter.get('/', async (request, response) => {
  const notes = await Blog.find({})
  response.json(notes)
})
  

//need to change to async await 
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  // if (body.title === undefined || body.author === undefined  || body.url === undefined  ||body.likes === undefined) {
  //   return response.status(400).json({ error: 'Need to fill all required fields' })
  // }
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author
  })
  try {
    const savedBlog = await blog.save()
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
