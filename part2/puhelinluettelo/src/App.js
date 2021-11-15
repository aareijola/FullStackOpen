import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  
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
      <h1>Numbers</h1>
      <Persons persons = {personsToShow}/>
    </div>
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