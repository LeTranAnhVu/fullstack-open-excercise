import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries , setCountries] = useState([])
  const [displayCountries , setDisplayCountries] = useState([])
  const [searchValue , setSearchValue] = useState('')
  // fetch data from server
  useEffect(() => {
    const url = 'https://restcountries.eu/rest/v2/all'
    axios.get(url).then(({data}) => {
      if (data) {
        setCountries(data)
        console.log(data)
      }
    }).catch(err => {
      console.error(err)
    })
  }, [])

  const filterByName = (kw) => {
    if (!kw) {
      // display all
      setDisplayCountries([...countries])
    } else {
      let re = new RegExp(kw, 'i') // case insensitive
      let matchStr = countries.filter(country => country.name.match(re))
      setDisplayCountries([...matchStr])
    }
    setSearchValue(kw)
  }
  return (
    <div>
        <Filter filterByName={filterByName} searchValue={searchValue}/>
        <Countries countries={displayCountries}/>
    </div>
  )
}

export default App
