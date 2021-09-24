import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { initNoti, setNoti} from '../reducers/notificationReducer'

function AnecdoteForm () {
  const dispatch = useDispatch()
  const addNewNote = async(event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNewAnecdote(content))
    dispatch(setNoti('New anedote was add'))
    setTimeout(() => {
      dispatch(initNoti())
    }, 1000);
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
