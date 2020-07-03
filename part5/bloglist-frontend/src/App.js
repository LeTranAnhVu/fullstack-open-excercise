import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {login} from './services/login'
import localstorage from './utils/localstorage'

import './App.css'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const onNewBlogCreated = () => {
    fetchBlogs()
  }

  useEffect(() => {
    // check token
    const userEncoded = localstorage.getItem('user')
    if (userEncoded) {
      setUser(JSON.parse(userEncoded))
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({username: username, password: password})
      const token = user.token
      const name = user.name
      const id = user.id

      if (!token) {
        console.log('fail')
        return null
      }
      localstorage.saveItem('access_token', token)
      localstorage.saveItem('user', {username, name, id})

      setUser({username, name, id})
      console.log('login success')
      setUsername('')
      setPassword('')
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        setErrorMessage(e.response.data.error)
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <div>
        <span className={'login-error-message'}>{errorMessage}</span>
      </div>
      <button type="submit">login</button>
    </form>
  )
  const handlerLogout = () => {
    localstorage.clearAll()
    setUser(null)
  }

  const afterLogin = () => (
    <div>
      <h2>blogs</h2>
      <h2>{user.name} logged in <button onClick={handlerLogout}>logout</button></h2>
      <CreateBlogForm onCreateSuccess={onNewBlogCreated}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )

  if (!user) {
    return loginForm()
  } else {
    return afterLogin()
  }
}

export default App