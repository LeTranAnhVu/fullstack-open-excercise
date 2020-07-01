import React, {useEffect, useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      let re = new RegExp(name, 'i') // case insensitive
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
      <Filter searchName={searchName} filterByName={filterByName}/>
      <h3>Add New</h3>
      <PersonForm name={newName} number={newNumber} updateNewValue={updateNewValue} updatePhoneBook={updatePhoneBook}/>
      <h2>Numbers</h2>
      <Persons persons={displayPersons}/>
    </div>
  )
}

export default App
