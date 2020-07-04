import React, {useState} from 'react'
import blogService from '../../services/blogs'
import './Blog.css'

const Blog = ({onUpdateSuccess, blog}) => {
  const [isShow, setIsShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    const {id} = blog
    setIsLoading(true)
    try {
      await blogService.likeById(id)
      onUpdateSuccess()
    } catch (e) {
      let message = ''
      if (e.response.data && e.response.data.error) {
        message = e.response.data.error
      } else {
        message = 'Cannot like'
      }
      console.log(e.response)
      // onUpdateFail(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={'blog'}>
      <div className={`blog-overlay ${isLoading ? 'show' : ''}`}/>
      {blog.title}
      <button onClick={() => setIsShow(!isShow)}>{isShow ? 'hide' : 'show'}</button>
      <div className={!isShow ? 'blog-detail hide' : 'blog-detail'}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
      </div>
    </div>
  )
}
export default Blog
