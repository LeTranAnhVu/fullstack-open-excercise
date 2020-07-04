import React, {useState} from 'react'
import './Togglable.css'
import PropTypes from 'prop-types'

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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}
export default Togglable
