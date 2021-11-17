import React, { useEffect, useState } from 'react'
import communication from './services/communication'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  useEffect(() => {
    communication.getAll().then(persons => setPersons(persons))
  }, [])
  
  
  const handleNameChange  = (event) => {
    setNewName(event.target.value)
  }

  const removePerson = (person) => {
    if (window.confirm(`Really delete ${person.name}?`)) {
      communication.remove(person.id).then(() => {
      setPersons(persons.filter((p) => p.id !== person.id))
    })}
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
      communication.create(newPersonObject).then(returned => {
        setPersons(persons.concat(returned))
        setNewName("")
        setNewNumber("")
      })
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
      <Persons persons = {personsToShow} removePerson = {removePerson}/>
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

const Persons = ({persons, removePerson}) => {
  return <div>{ persons.map(person => <Person person = {person} key = {person.name} removePerson = {removePerson}/>) }</div>
}

const Person = ({person, removePerson}) => {
  return <div>{person.name} {person.number} <button onClick = {() => removePerson(person)}>delete</button> </div>
}

const FilterForm = ({filterText, onChange}) => {
  return (
    <div>
      filter shown with <input value = {filterText} onChange = {onChange} />
    </div>
  )
}


export default App