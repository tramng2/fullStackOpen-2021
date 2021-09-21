import React from 'react'
import AnecdoteContent from './components/AnecdoteContent'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>A necdotes</h2>
      <Notification/>
      <Filter />
      <AnecdoteContent/>
      <AnecdoteForm/>
    </div>
  )
}

export default App