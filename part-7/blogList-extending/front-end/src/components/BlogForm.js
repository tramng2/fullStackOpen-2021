import React from 'react'
import { useDispatch } from 'react-redux'
import { setNoti } from '../reducers/notiReducer'
import { createBlog } from '../reducers/blogReducer'
function BlogForm () {
  const dispatch = useDispatch()
  const createNewBlog = async event => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: event.target.likes.value
    }
    dispatch(createBlog(content))
    dispatch(setNoti('New blog was added', 'noti', 3000))
  }
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input name='title' />
        </div>
        <div>
          author:
          <input name='author' />
        </div>
        <div>
          url:
          <input name='url' id='url' />
        </div>
        <div>
          likes:
          <input name='likes' />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
