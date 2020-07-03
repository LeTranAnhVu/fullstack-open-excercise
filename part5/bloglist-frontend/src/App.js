import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {login} from './services/login'
import localstorage from './utils/localstorage'

import './App.css'

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


  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const data = await login({username: username, password: password})
      const token = data.token
      const name = data.name
      const id = data.id

      if (!token) {
        console.log('fail')
        return null
      }
      localstorage.saveItem('access_token', token)
      localstorage.saveItem('username', username)
      setUser({username, name, id})
      console.log('login success')
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

  const afterLogin = () => (
    <div>
      <h2>blogs</h2>
      <h2>{user.name} logged in</h2>
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