import React from 'react'

const Button = ({type, onFeedback}) => {

  return (
    <button onClick={() => onFeedback(type)}>{type}</button>
  )
}

export default Button