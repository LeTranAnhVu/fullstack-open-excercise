import React, {useState} from 'react'
import './Togglable.css'

const Togglable = ({buttonLabel, children}) => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div>
      <div className={isShow ? 'togglable-hide' : ''}>
        <button onClick={() => setIsShow(true)}>{buttonLabel}</button>
      </div>
      <div className={!isShow ? 'togglable-hide' : ''}>
        {children}
        <button onClick={() => setIsShow(false)}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
