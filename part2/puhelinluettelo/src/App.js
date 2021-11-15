import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  
  const handleNameChange  = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
            <Persons persons = {persons}/>
    </div>
  )

}

const Persons = ({persons}) => {
  return <div>{ persons.map(person => <Person person = {person} key = {person.name} />) }</div>
}

const Person = ({person}) => {
  return <div>{person.name} {person.number}</div>
}





export default App