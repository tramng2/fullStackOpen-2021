import React, {useState} from 'react'

function BlogForm({createBlog, blogs}) {
  const [inputBlog, setInputBlog] = useState({});
  const handleChange = (event) => {
    setInputBlog({ ...inputBlog, [event.target.name]: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: inputBlog.title,
      author: inputBlog.author,
      url: inputBlog.url,
      likes: inputBlog.likes,
    };
    createBlog(newBlog)
    setInputBlog({})
  }

    return (
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={addBlog}>
        
        <div> title:
          <input
            onChange={handleChange}
            value={blogs.title}
            name="title"
          />
        </div>
        <div> author:
          <input
            onChange={handleChange}
            value={blogs.author}
            name="author"
          />
        </div>
        <div> url:
          <input
            onChange={handleChange}
            value={blogs.url}
            name="url"
          />
        </div>
        <div> likes:
          <input
            onChange={handleChange}
            value={blogs.likes}
            name="likes"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
}

export default BlogForm