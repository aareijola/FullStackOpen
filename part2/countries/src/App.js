import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      Find countries <input value = {filter} onChange = {handleFilterChange} />
      <SearchResults countries = {countries} filter = {filter} setFilter = {setFilter}/>
    </div>
  )
}

const SearchResults = ({countries, filter, setFilter}) => {

  const countriesToShow = countries.filter((country) => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => (a.name.common.toLowerCase() < b.name.common.toLowerCase()) ? -1 : 1) // sorts the array of found countries alphabetically by common name
  if (countriesToShow.length > 10) return (
    <div>Too many matches, specify another filter</div>
  )
  else if (countriesToShow.length === 1) return (
    <LastResult country = {countriesToShow[0]}/>
  )
  return (
    <div>
      {countriesToShow.map((country) => <Result country = {country} setFilter = {setFilter} key = {country.name.common}/>)}
    </div>
  )
}

const Result = ({country, setFilter}) => {
  return <div>{country.name.common} <button onClick = {() => setFilter(country.name.common)}>show</button></div>
}

const LastResult = ({country}) => {
  return (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages).map((name) => <li key = {name}>{name}</li> )}
    </ul>
    <img src = {country.flags.png} alt = "flag"/>
    <Weather city = {country.capital}/>
  </div>
  )
}

const Weather = ({city}) => {
  const [data, setData] = useState([])
  const apikey = process.env.REACT_APP_API_KEY
  const query = `http://api.weatherstack.com/current?access_key=${apikey}&query=${city}`
  useEffect(() => {
    axios
      .get(query)
      .then( response => {
        setData(response.data)
      })
  }, [query])
  
  if (data.length === 0) return (<div></div>)
  return (
  <div>
    <h2>Weather in {city}</h2>
    <p><b>Temperature:</b> {data.current.temperature} degrees</p>
    <img src = {data.current.weather_icons} alt = "weather"/>
    <p><b>Wind:</b> {data.current.wind_speed} mph direction {data.current.wind_dir}</p>
  </div>)
}

export default App
