const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogSchema')
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
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

test('deleting a single blog post', async () => {
  const blogListStart = await helper.blogsInDb()
  const deleteBlog = blogListStart[0]
  console.log(deleteBlog)

  await api.delete(`/api/blogs/${deleteBlog.id}`).expect(204)
  const blogListEnd = await helper.blogsInDb()
  expect(blogListEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('updating the amout of likes', async () => {
  const blogListStart = await helper.blogsInDb()
  const updateBlog = {
    'title': 'new blog',
    'author': 'tram Nguyent thi vu',
    'url': 'original.com',
    'likes': '2222'
  }
  await api.put(`/api/blogs/${blogListStart[0].id}`)
    .send(updateBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const [likes] = response.body.map(r => r.likes)
  expect(likes).toEqual(2222)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
afterAll(() => {
  mongoose.connection.close()
})