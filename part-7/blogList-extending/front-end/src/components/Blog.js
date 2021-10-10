import React from 'react'
import BlogDetails from './BlogDetails'
import { useSelector} from 'react-redux'
const Blog = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
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
        <div style={blogStyle} key={blog.id} data-cy="blogList" >
          <BlogDetails blog={blog} user={user}/>
        </div>
      ))}
    </div>
  )
}

export default Blog
