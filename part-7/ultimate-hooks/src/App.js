import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = baseUrl => {
  const [resources, setResources] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(baseUrl).then(response => setResources(response.data))
    }
    fetchData()
  }, [baseUrl])

  const createService = resource => {
    axios
      .post(baseUrl, resource)
      .then(resp => {
        const fetchData = async () => {
          await axios.get(baseUrl).then(response => setResources(response.data))
        }
        fetchData()
      })
      .catch(error => {
        console.log('error',error)
      })
  }

  return [resources, createService]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = event => {
    event.preventDefault()
    noteService({ content: content.value })
  }

  const handlePersonSubmit = event => {
    event.preventDefault()
    personService({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
