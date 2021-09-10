import React from 'react'
import AnecdoteContent from './components/AnecdoteContent'
import AnecdoteForm from './components/AnecdoteForm'
const App = () => {
  return (
    <div>
      <h2>A necdotes</h2>
      <AnecdoteContent/>
      <AnecdoteForm/>
    </div>
  )
}

export default App