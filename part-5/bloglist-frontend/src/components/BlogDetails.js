import React, { useState } from 'react'

function BlogDetails({ blog, handleAddLikes, handleDelete }) {
  const [content, setContent] = useState('view')
  const [visible, setVisible] = useState(false)
  const showWhenInVisible = { display: visible ? '' : 'none' }

  const toggleContent = () => {
    setVisible(!visible)
    if (visible) setContent('hide')
    if (!visible) setContent('view')
  }

  return (
    <div>
      {blog.title} {blog.author}
      <button onClick={() => toggleContent()}>{content}</button>
      <div style={showWhenInVisible}>
        <p>{blog.url}</p>
        <span>{blog.likes}</span><button onClick={() => handleAddLikes(blog)}>like</button>
        <p>{blog.user ? blog.user.username: null}</p>
        <button onClick={() => handleDelete(blog)} style={{ display : blog.user ? '': 'none' }}>remove</button>
      </div>
    </div>
  )
}

export default BlogDetails
