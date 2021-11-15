import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const handleChange  = (event) => {
    setNewName(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log(event)
    const newPersonObject = {
      name : newName
    }
    setNewName("")
    setPersons(persons.concat(newPersonObject))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addNewPerson}>
        <div>
          name: <input value = {newName} onChange = {handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key =  {person.name}>{person.name}</div>)}      
    </div>
  )

}





export default App