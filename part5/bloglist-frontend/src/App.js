import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

import localstorage from './utils/localstorage'

import './App.css'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const onNewBlogCreated = () => {
    fetchBlogs()
  }

  const handleLoginSuccess = (user) => {
    setUser(user)
  }

  const handlerLogout = () => {
    localstorage.clearAll()
    setUser(null)
  }

  const afterLogin = () => (
    <>
      <h2>{user.name} logged in <button onClick={handlerLogout}>logout</button></h2>
      <Togglable buttonLabel={'new blog'}>
        <CreateBlogForm onCreateSuccess={onNewBlogCreated}/>
      </Togglable>
    </>
  )
  return (
    <div>
      <h2>blogs</h2>
      {
        !user ?
          <LoginForm onLoginSuccess={handleLoginSuccess}/>
          :
          afterLogin()
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App