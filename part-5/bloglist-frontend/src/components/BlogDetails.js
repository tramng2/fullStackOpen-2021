import React, { useState } from "react";

function BlogDetails({ blog }) {
  const [content, setContent] = useState("view");
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenInVisible = { display: visible ? "" : "none" };

  const toggleContent = () => {
    setVisible(!visible);
    if (visible) setContent("hide");
    if (!visible) setContent("view");
  };

  return (
    <div>
      {blog.title} {blog.author}
      <button onClick={() => toggleContent()}>{content}</button>
      <div style={showWhenInVisible}>
        <p>{blog.url}</p>
        <span>{blog.likes}</span><button>like</button>
        <p>{blog.user ? blog.user.username: null}</p>
      </div>
    </div>
  );
}

export default BlogDetails;
