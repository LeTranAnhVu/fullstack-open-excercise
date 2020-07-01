import React from 'react'

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total+ part.exercises, 0)
  return(
    <h2>Total of {sum} exercises</h2>
  )
}

export default Total