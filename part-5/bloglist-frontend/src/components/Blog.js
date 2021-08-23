import React from 'react'
import BlogDetails from './BlogDetails'
const Blog = ({ blogs, user, handleAddLikes, handleDelete }) => {
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
        <div style={blogStyle} key={blog.id} >
          <BlogDetails blog={blog} user={user} handleAddLikes={handleAddLikes} handleDelete={handleDelete}/>
        </div>
      ))}
    </div>
  )
}

export default Blog
