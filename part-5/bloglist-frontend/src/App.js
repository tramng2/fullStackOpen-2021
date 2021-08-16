import React, { useState, useEffect, useRef} from "react";
import Blog from "./components/Blog";
import blogsService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import ToggleTable from "./components/ToggleTable";

const App = () => {
  
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({ type: "noti", content: "Logged" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    } catch (exception) {
      setMessage({ type: "error", content: "Username or Password is invalid" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogsService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    setMessage({ type: "noti", content: "new note added" });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 3000);
  };
  const logout = () => {
    setUser(null);
    setMessage({ type: "noti", content: "Log out" });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 3000);
    window.localStorage.removeItem("loggedUser");
  };
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      {user === null ? (
       <ToggleTable buttonLable="login">
         <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
       </ToggleTable>
      ) : (
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={logout}>Log out</button>
          <ToggleTable buttonLable="Create new blog" ref={blogFormRef}>
            <BlogForm 
            createBlog={addBlog}
            blogs={blogs}
            />
          </ToggleTable>
          <Blog blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
