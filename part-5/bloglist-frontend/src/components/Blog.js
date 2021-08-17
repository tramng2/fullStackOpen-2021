import React from 'react'
import BlogDetails from './BlogDetails'
const Blog = ({ blogs, handleAddLikes, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <BlogDetails blog={blog} handleAddLikes={handleAddLikes} handleDelete={handleDelete}/>
        </div>
      ))}
    </div>
  )
}

export default Blog
