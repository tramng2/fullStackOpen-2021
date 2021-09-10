import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, createNewAnecdote } from './reducers/anecdoteReducer'
import AnecdoteContent from './components/AnecdoteContent'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  anecdotes.sort(function (a, b) {
    return b.votes- a.votes;
  });
  
  const addNewNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNewAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <AnecdoteContent anecdote={anecdote} key={anecdote.id}/>
      )}
      <h2>create new</h2>
      <form onSubmit={addNewNote}>
        <div><input name="note" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App