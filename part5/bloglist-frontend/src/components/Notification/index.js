import React from 'react'
import './Notification.css'
const Notification = ({message, type}) => {
  return <div className={`message ${type}`}>
    <p>{message}</p>
  </div>
}
export default Notification