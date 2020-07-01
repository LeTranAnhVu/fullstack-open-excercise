import React, {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
  const [newName, setNewName] = useState('')

  const updateNewName = (e) => {
    const value = e.target.value
    setNewName(value)
  }
  const updatePhoneBook = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim()
    if(trimmedName) {
      setPersons([...persons, {name: trimmedName}])
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input type="text" onChange={updateNewName}/>
        </div>
        <div>
          <button onClick={updatePhoneBook} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map((person) => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App
