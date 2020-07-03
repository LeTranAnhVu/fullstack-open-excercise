import React, {useEffect, useState} from 'react'
import personService from './services/person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [displayPersons, setDisplayPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })


  const filterByName = (name) => {
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

  const fetchPerson = () => {
    personService.getAll().then(({data}) => {
      if (data) {
        setPersons([...data])
      }
    }).catch(err => {
      console.error(err)
    })
  }

  // fetch data from server
  useEffect(() => {
    fetchPerson()
  }, [])

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
  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }
  const updatePhoneBook = (e) => {
    e.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (trimmedName && trimmedNumber) {
      // prevent user input exist name
      const existedPerson = persons.find(person => person.name === trimmedName)
      if (existedPerson) {
        const answer = window.confirm(`${trimmedName} is already added to phonebook, replace the old number with new one`)
        if (answer) {
          personService.updateById(existedPerson.id, {...existedPerson, number: trimmedNumber})
            .then(({data}) => {
              setNotification({message: 'update success', type: 'success'})
              resetFields()
            })
            .catch(err => {
              if (err.response && err.response.data && err.response.data.error) {
                setNotification({message: `${err.response.data.error}`, type: 'error'})
              } else {
                setNotification({
                  message: `Cannot update user`,
                  type: 'error'
                })
              }
            })
            .finally(() => fetchPerson())
        }
      } else {
        // send to server
        personService.create({name: trimmedName, number: trimmedNumber})
          .then(({data}) => {
            if (data.id) {
              setPersons([...persons, {...data}])
              setNotification({message: `added ${data.name}`, type: 'success'})
              resetFields()
            }
          })
          .catch(err => {
            if (err.response && err.response.data && err.response.data.error) {
              setNotification({message: `${err.response.data.error}`, type: 'error'})
            } else {
              setNotification({message: `cannot added new person`, type: 'error'})
            }
          })

        // reset input field

      }
    }
  }
  const onDeletePerson = (person) => {
    const answer = window.confirm(`Delete ${person.name}?`)
    if (answer) {
      personService.deleteById(person.id)
        .then(({data}) => {
          setNotification({
            message: `removed ${person.name}`,
            type: 'error'
          })
        })
        .catch(err => {
          setNotification({
            message: `information of ${person.name} has already been removed from server`,
            type: 'error'
          })
        })
        .finally(() => {
          fetchPerson()
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>

      {notification.message && <Notification message={notification.message} type={notification.type}/>}

      <Filter searchName={searchName} filterByName={filterByName}/>
      <h3>Add New</h3>
      <PersonForm name={newName} number={newNumber} updateNewValue={updateNewValue} updatePhoneBook={updatePhoneBook}/>
      <h2>Numbers</h2>
      <Persons onDeletePerson={onDeletePerson} persons={displayPersons}/>
    </div>
  )
}

export default App
