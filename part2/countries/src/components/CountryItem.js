import React, {useState} from 'react'
import CountryDetail from './CountryDetail'

const CountryItem = ({country}) => {
  const [isShow, setIsShow] = useState(false)
  return (
    <div>
      <p>{country.name}
        <button onClick={() => setIsShow(!isShow)}>{isShow ? 'close' : 'show' }</button>
      </p>
      {isShow && <CountryDetail country={country}/>}
    </div>
  )
}

export default CountryItem