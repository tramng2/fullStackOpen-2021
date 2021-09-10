import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

function AnecdoteContent({anecdote}) {
  const dispatch = useDispatch()

  const upVote = (id) => {
    dispatch(addVote(id))
  }
    return (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upVote(anecdote.id)}>vote</button>
          </div>
        </div>
    )
}

export default AnecdoteContent
