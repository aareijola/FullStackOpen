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
      <SearchResults countries = {countries} filter = {filter}/>
    </div>
  )
}

const SearchResults = ({countries, filter}) => {

  const countriesToShow = countries.filter((country) => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => (a.name.common.toLowerCase() < b.name.common.toLowerCase()) ? -1 : 1) // sorts the array of found countries alphabetically by common name
  if (countriesToShow.length > 10) return (
    <div>Too many matches, specify another filter</div>
  )
  else if (countriesToShow.length === 1) return (
    <LastResult country = {countriesToShow[0]} />
  )
  return (
    <div>
      {countriesToShow.map((country) => <Result country = {country} key = {country.name.common}/>)}
    </div>
  )
}

const Result = ({country}) => {
  return <div>{country.name.common}</div>
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
  </div>
  )
}

export default App
