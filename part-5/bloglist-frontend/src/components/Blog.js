import React from 'react'
const Blog = ({blogs, logout, user}) => {
  return (
  <div>
    {blogs.map((blog) => <p key={blog.id}> {blog.id} {blog.title} {blog.author}</p>)}
  </div>  
  )
}


export default Blog