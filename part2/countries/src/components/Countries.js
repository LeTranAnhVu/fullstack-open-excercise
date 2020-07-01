import React from 'react'
import CountryDetail from './CountryDetail'
import CountryItem from './CountryItem'
const Countries = ({countries}) => {
  if (countries.length > 0) {
    if (countries.length === 1) {
      return <CountryDetail country={countries[0]}/>
    } else if (countries.length <= 10) {
      return <ul>{countries.map(country => <li key={country.alpha2Code}><CountryItem country={country}/></li>)}</ul>
    }else {
      return <div>Too many matches,specify another filter</div>
    }
  } else {
    return <div>no matched country!</div>
  }
}

export default Countries