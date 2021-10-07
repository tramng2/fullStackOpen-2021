const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')

const initialBlogs = [
  {
    'title': 'initialBlogs',
    'author': 'tram Nguyent thi vu',
    'url': 'original.com',
    'likes': '111'
  }
]

const nonExistingId = async () => {
  const item = new Blog({
    'title': 'testing helper',
    'author': 'tram Nguyent thi vu cucuuu',
    'url': 'fsfksjfjflsjfsljflsjfsljfsljflsjfs',
    'likes': '111'
  })
  await item.save()
  await item.remove()

  return item._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(note => note.toJSON())
}
const usersInDb = async () => {
  const user = await User.find({})
  return user.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,usersInDb
}