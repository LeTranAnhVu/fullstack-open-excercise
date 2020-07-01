import React, {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '03-333-3232'}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const updateNewValue = (e) => {
    const fieldName = e.target.name
    const value = e.target.value
    if (fieldName === 'name') {
      setNewName(value)
    } else if (fieldName === 'number') {
      setNewNumber(value)
    }
  }
  const updatePhoneBook = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (trimmedName && trimmedNumber) {
      // prevent user input exist name
      const existedPerson = persons.find(person => person.name === trimmedName)
      if (existedPerson) {
        window.alert(`${trimmedName} is already added to phonebook`)
      } else {
        // allow to add
        setPersons([...persons, {name: trimmedName, number: trimmedNumber}])

        // reset input field
        setNewName('')
        setNewNumber('')
      }
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} type="text" name={'name'} onChange={updateNewValue}/>
        </div>
        <div>
          number: <input value={newNumber} type="text" name={'number'} onChange={updateNewValue}/>
        </div>
        <div>
          <button onClick={updatePhoneBook} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App
