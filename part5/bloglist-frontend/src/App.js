import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('There will be an a handler but login failed yoo')
    }
  }
  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value
    }
    const res = await blogService.create(newBlog)
    setBlogs(blogs.concat(res))
    event.target.reset()
  }
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type='submit'>login</button>

        </form>
      </div>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      </div>
      <NewBlogForm onSubmit={handleNewBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App