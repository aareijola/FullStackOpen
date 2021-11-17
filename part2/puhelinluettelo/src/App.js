import React, { useEffect, useState } from 'react'
import communication from './services/communication'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState("")
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
      setNotificationMessage(`Removed ${person.name}`)
      setTimeout(() => setNotificationMessage(""), 5000)
    })
    }
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
        setNotificationMessage(`Added ${returned.name}`)
        setTimeout(() => setNotificationMessage(""), 5000)
        setNewName("")
        setNewNumber("")
      })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const newPersonObject = { ...person, number : newNumber}
        communication.update(newPersonObject.id, newPersonObject).then((returned) => {
          setPersons(persons.map(person => person.id !== newPersonObject.id ? person : newPersonObject))
          setNotificationMessage(`Updated ${returned.name}`)
          setTimeout(() => setNotificationMessage(""), 5000)
        })
      }
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message = {notificationMessage}/>
      <FilterForm filterText = {filter} onChange = {handleFilterChange}/>
      <h1>Add new</h1>
      <NewPersonForm addNewPerson = {addNewPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h1>Numbers</h1>
      <Persons persons = {personsToShow} removePerson = {removePerson}/>
    </div>
  )
}

const Notification = ({message}) => {
  if (message === "") {
    return null
  }
  return (
    <div className = "notification">
      {message}
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