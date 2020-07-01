import React from 'react'

const PersonForm = ({name, number, updateNewValue, updatePhoneBook}) => {
  return (
    <form>
      <div>
        name: <input value={name} type="text" name={'name'} onChange={updateNewValue}/>
      </div>
      <div>
        number: <input value={number} type="text" name={'number'} onChange={updateNewValue}/>
      </div>
      <div>
        <button onClick={updatePhoneBook} type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm