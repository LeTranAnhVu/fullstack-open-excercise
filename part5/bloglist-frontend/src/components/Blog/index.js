import React, {useState} from 'react'
import './Blog.css'

const Blog = ({blog}) => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div className={'blog'}>
      {blog.title}
      <button onClick={() => setIsShow(!isShow)}>{isShow ? 'hide' : 'show'}</button>
      <div className={!isShow ? 'blog-detail hide' : 'blog-detail'}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
      </div>
    </div>
  )
}
export default Blog
