const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogSchema')
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
//makesure that database is the same before each test is run

let token

// Test suite
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const rootUser = await new User({
    username: 'root',
    passowrd: 'secret',
  }).save()

  const userForToken = { username: rootUser.username, id: rootUser.id }
  token = jwt.sign(userForToken, process.env.SECRET)
  
  await Promise.all(
    helper.initialBlogs.map((blog) => {
      blog.user = rootUser.id
      return new Blog(blog).save()
    })
  )
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
    .set('Authorization', `bearer ${token}`)
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
    .set('Authorization', `bearer ${token}`)
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
    .set('Authorization', `bearer ${token}`)
    .expect(400)

  const response = await api.get('/api/blogs') 
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('deleting a single blog post', async () => {
  const blogListStart = await helper.blogsInDb()
  const deleteBlog = blogListStart[0]

  await api.delete(`/api/blogs/${deleteBlog.id}`).set('Authorization', `bearer ${token}`)
    .expect(204)
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
    const passwordHash = await bcrypt.hash('rootpassword', 10)
    const user = new User({ username: 'root', passwordHash })
    console.log(passwordHash)
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
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
afterAll(() => {
  mongoose.connection.close()
})