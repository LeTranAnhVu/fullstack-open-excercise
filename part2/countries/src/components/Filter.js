import React from 'react'

const Filter = ({searchValue, filterByName}) => {

  const handlerChange = (e) => {
    filterByName(e.target.value)
  }
  return (
    <div>
      find countries<input value={searchValue} type="text" onChange={handlerChange}/>
    </div>
  )
}

export default Filter