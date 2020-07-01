import React from 'react'
import CapitalWeather from './CapitalWeather'

const CountryDetail = ({country}) => {
  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages && country.languages.map(lang => <li key={lang.name}>{lang.name}</li>) }
      </ul>
      <img width={250} src={country.flag} alt={country.name}/>
      <CapitalWeather capital={country.capital}/>
    </div>
  )
}

export default CountryDetail