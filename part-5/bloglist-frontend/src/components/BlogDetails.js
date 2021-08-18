import React, { useState } from 'react'

function BlogDetails({ blog, handleAddLikes, handleDelete }) {
  const [content, setContent] = useState('view')
  const [visible, setVisible] = useState(false)
  const showWhenInVisible = { display: visible ? '' : 'none' }

  const toggleContent = () => {
    setVisible(!visible)
    visible ? setContent('view') : setContent('hide')
  }
  return (
    <div>
      <div className="blogInfo">
        {blog.title} {blog.author}
      </div>
      <button onClick={() => toggleContent()}>{content}</button>
      <div style={showWhenInVisible} className="blogInfoExpand">
        <p>{blog.url}</p>
        <span>{blog.likes}</span><button onClick={() => handleAddLikes(blog)}>like</button>
        <p>{blog.user ? blog.user.username: null}</p>
        <button onClick={() => handleDelete(blog)} style={{ display : blog.user ? '': 'none' }}>remove</button>
      </div>
    </div>
  )
}

export default BlogDetails
