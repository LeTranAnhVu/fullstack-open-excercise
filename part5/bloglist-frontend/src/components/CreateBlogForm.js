import React, {useState} from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'

const CreateBlogForm = ({onCreateSuccess}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const updateNewValue = (e) => {
    const fieldName = e.target.name
    const value = e.target.value
    if (fieldName === 'title') {
      setTitle(value)
    } else if (fieldName === 'author') {
      setAuthor(value)
    } else if (fieldName === 'url') {
      setUrl(value)
    }
  }

  const createBlog = async (e) => {
    e.preventDefault()
    const payload = {title, author, url}
    try {
      const newBlog = await blogService.create(payload)
      resetForm()
      onCreateSuccess()
      setNotification({message: `${newBlog.title} by ${newBlog.author || 'unknown'} added`, type: 'success'})
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        setNotification({message: e.response.data.error, type: 'error'})
      } else {
        setNotification({message: 'Cannot add blog', type: 'error'})
      }
    } finally {
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 3000)
    }
  }

  return (
    <div>
      <h3>Add new blog</h3>
      {notification.message && <Notification message={notification.message} type={notification.type}/>}
      <form>
        <div>
          title: <input value={title} type="text" name={'title'} onChange={updateNewValue}/>
        </div>
        <div>
          author: <input value={author} type="text" name={'author'} onChange={updateNewValue}/>
        </div>
        <div>
          url: <input value={url} type="text" name={'url'} onChange={updateNewValue}/>
        </div>
        <div>
          <button onClick={createBlog} type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  onCreateSuccess: PropTypes.func.isRequired,
}

export default CreateBlogForm
