import React from 'react'

const Country = ({country}) => {
  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages && country.languages.map(lang => <li key={lang.name}>{lang.name}</li>) }
      </ul>

      <img src={country.flag} alt={country.name}/>
    </div>
  )
}

export default Country