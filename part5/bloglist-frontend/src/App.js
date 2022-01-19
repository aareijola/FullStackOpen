import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Alerts from './components/Alerts'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const blogFormRef = useRef()

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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {setErrorMessage('')},5000)
    }
  }
  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createBlog = async (newBlogObject) => { 
    try {
      const res = await blogService.create(newBlogObject)
      setAlertMessage(`A new blog ${newBlogObject.title} by ${newBlogObject.author} added`)
      setTimeout(() => {setAlertMessage('')},5000)
      setBlogs(blogs.concat(res))
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      console.log(e.message)
      setErrorMessage('Could not create a new blog post')
      setTimeout(() => {setErrorMessage('')}, 5000)
    }
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
        <Alerts.Alert message={alertMessage}/>
        <Alerts.Error message={errorMessage}/> 
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
              type="password"
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
      <Alerts.Alert message={alertMessage}/>
      <Alerts.Error message={errorMessage}/>
      <div>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      </div>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App