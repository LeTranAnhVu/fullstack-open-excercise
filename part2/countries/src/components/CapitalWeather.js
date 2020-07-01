import React, {useEffect, useState} from 'react'
import axios from 'axios'

const CapitalWeather = ({capital}) => {
  const [weather, setWeather] = useState({
    temperature: null,
    windSpeed: null,
    windDir: null,
    weatherIcons: []
  })
  useEffect(() => {
    const url = 'http://api.weatherstack.com/current'
    const key = process.env.REACT_APP_API_KEY
    axios.get(url, {params: {access_key: key, query: capital}}).then(({data}) => {
      if(data.current) {
        const {temperature, wind_speed, wind_dir, weather_icons} = data.current
        setWeather({...weather, temperature, windSpeed: wind_speed, windDir: wind_dir, weatherIcons: weather_icons})
      }
    })
  }, [capital])
  return(
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.temperature} Celcius</p>
      {
        weather.weatherIcons && weather.weatherIcons.map((icon,i) => <img width={60} key={i} src={icon} alt="weather icon"/>)
      }
      <p>Wind: {weather.windSpeed} mph direction {weather.windDir}</p>
    </div>
  )
}

export default CapitalWeather