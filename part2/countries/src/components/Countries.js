import React from 'react'
import Country from './Country'

const Countries = ({countries}) => {
  if (countries.length > 0) {
    if (countries.length === 1) {
      return <Country country={countries[0]}/>
    } else if (countries.length <= 10) {
      return <ul>{countries.map(country => <li key={country.alpha2Code}>{country.name}</li>)}</ul>
    }else {
      return <div>Too many matches,specify another filter</div>
    }
  } else {
    return <div>no matched country!</div>
  }
}

export default Countries