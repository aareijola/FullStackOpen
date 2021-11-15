import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  
  const handleNameChange  = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName) === undefined) {
      const newPersonObject = {
        name : newName,
        number : newNumber
      }
      setNewName("")
      setNewNumber("")
      setPersons(persons.concat(newPersonObject))
    }
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filterText = {filter} onChange = {handleFilterChange}/>
      <h1>Add new</h1>
      <NewPersonForm addNewPerson = {addNewPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h1>Numbers</h1>
      <Persons persons = {personsToShow}/>
    </div>
  )

}

const NewPersonForm = ({addNewPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit = {addNewPerson}>
      <div>
        name: <input value = {newName} onChange = {handleNameChange} />
      </div>
      <div> 
        number: <input value = {newNumber} onChange = {handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return <div>{ persons.map(person => <Person person = {person} key = {person.name} />) }</div>
}

const Person = ({person}) => {
  return <div>{person.name} {person.number}</div>
}

const FilterForm = ({filterText, onChange}) => {
  return (
    <div>
      filter shown with <input value = {filterText} onChange = {onChange} />
    </div>
  )
}


export default App