import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import blogService from '../../services/blogs'
import './Blog.css'
import localstorage from '../../utils/localstorage'

const Blog = ({onUpdateSuccess, blog}) => {
  const [isShow, setIsShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAllowRemove, setIsAllowRemove] = useState(false)

  useEffect(() => {
    const {user} = blog
    const loggedInUser = localstorage.getItem('user')
    if (user && loggedInUser) {
      setIsAllowRemove(loggedInUser.id === user._id)
    }
  }, [blog])

  const handleLike = async () => {
    const {id} = blog
    setIsLoading(true)
    try {
      await blogService.likeById(id)
      onUpdateSuccess()
    } catch (e) {
      console.log(e.response)
      // onUpdateFail(message)
    } finally {
      setIsLoading(false)
    }
  }
  const handleRemove = async () => {
    const answer = window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)
    if (answer) {
      const {id} = blog
      setIsLoading(true)
      try {
        await blogService.removeById(id)
        onUpdateSuccess()
      } catch (e) {
        console.log(e.response)
        // onUpdateFail(message)
      }
    }
  }

  return (
    <div className={'blog'}>
      <div className={`blog-overlay ${isLoading ? 'show' : ''}`}/>
      <p className={'title'}>{blog.title}</p>
      <button className={'show-more-btn'} onClick={() => setIsShow(!isShow)}>{isShow ? 'hide' : 'show'}</button>
      <div className={!isShow ? 'blog-detail hide' : 'blog-detail'}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes}
          <button className={'like-btn'} onClick={handleLike}>like</button>
        </p>
        {
          isAllowRemove && <button onClick={handleRemove}>Remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  onUpdateSuccess: PropTypes.func,
  blog: PropTypes.object
}
export default Blog
