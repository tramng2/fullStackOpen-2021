const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogSchema')
const { response } = require('../app')

//makesure that database is the same before each test is run

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('get all blog by GET request', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('verify unique identifier property of the blog post', async () => {
  const response = await api.get('/api/blogs')
  response.body.map((item) => expect(item.id).toBeDefined())
})

test('create a new blog post', async () => {
  const blog = {
    'title': 'new blog',
    'author': 'tram Nguyent thi vu',
    'url': 'original.com',
    'likes': '111'
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length +1)

})

test ('verify if likes property is missing', async () => {
  const blog = {
    'title': 'new blog',
    'author': 'tram Nguyent thi vu',
    'url': 'original.com',
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length +1)
})


test('verify if title and url property is missing', async () => {
  const blog = {
    'author': 'tram Nguyent thi vu',
    'likes': 111
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs') 
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})