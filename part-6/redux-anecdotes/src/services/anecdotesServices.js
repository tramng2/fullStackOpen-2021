import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
    const newAnecdote = {content, votes: 0}
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}
const updateVote = async (updateContent) => {
  const response = await axios.put(`${baseUrl}/${updateContent.id}`, updateContent)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateVote }
