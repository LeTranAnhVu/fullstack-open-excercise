import React, {useEffect, useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [displayPersons, setDisplayPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const filterByName = (name) => {
    name = name.trim()
    if (!name) {
      // display all
      setDisplayPersons([...persons])
    } else {
      let re = new RegExp(name, "i") // case insensitive
      let matchPersons = persons.filter(person => person.name.match(re))
      setDisplayPersons([...matchPersons])
    }
    setSearchName(name)
  }

  // whenever the person change such as push new person, then reset filter
  useEffect(() => {
    filterByName('')
  }, [persons])


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
      <div>
        Filter shown with <input value={searchName} type="text" onChange={(e) => filterByName(e.target.value)}/>
      </div>
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
        {displayPersons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App
