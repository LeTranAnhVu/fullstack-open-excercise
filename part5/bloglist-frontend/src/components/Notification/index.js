import React from 'react'
import './Notification.css'
import PropTypes from 'prop-types'
const Notification = ({message, type='success'}) => {
  return <div className={`message ${type}`}>
    <p>{message}</p>
  </div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string
}
export default Notification