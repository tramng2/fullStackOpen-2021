import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  const handleChange = (event) => {
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value })
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (newPerson.name && newPerson.number) {
      const isDuplicate = persons.filter(el => el.name === newPerson.name);
      if (isDuplicate.length > 0) {
        alert(`${newPerson.name} is already added to phonebook`)
        setNewPerson({ name: '', number: '' })
      } else {
        setPersons([...persons, newPerson])
        setNewPerson({ name: '', number: '' })
      }
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div> filter shown with:
        <input />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div> name:
          <input
            onChange={handleChange}
            value={newPerson.name}
            name="name"
          />
        </div>
        <div> number:
          <input
            onChange={handleChange}
            value={newPerson.number}
            name="number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => <li key={index}>{person.name} {person.number}</li>)}
      </ul>

    </div>
  )
}

export default App