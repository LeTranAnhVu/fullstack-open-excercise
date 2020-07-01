import React from 'react'
import Person from './Person'

const Persons = ({persons, onDeletePerson}) => {

  return (
    <ul>
      {persons.map(
        (person) => <Person key={person.id} person={person} onDelete={onDeletePerson}/>)
      }
    </ul>
  )
}

export default Persons