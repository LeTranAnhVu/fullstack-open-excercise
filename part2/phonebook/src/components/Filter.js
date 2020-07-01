import React from 'react'

const Filter = ({searchName, filterByName}) => {

  const handlerChange = (e) => {
    filterByName(e.target.value)
  }
  return (
    <div>
      Filter shown with <input value={searchName} type="text" onChange={handlerChange}/>
    </div>
  )
}

export default Filter