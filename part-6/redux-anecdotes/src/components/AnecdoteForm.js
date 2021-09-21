import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { addNoti } from '../reducers/notificationReducer'
import anecdotesServices from '../services/anecdotesServices'

function AnecdoteForm () {
  const dispatch = useDispatch()
  const addNewNote = async(event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newAnecdote = await anecdotesServices.createNewAnecdote(content)
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(addNoti('New anedote was add'))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewNote}>
        <div>
          <input name='note' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
