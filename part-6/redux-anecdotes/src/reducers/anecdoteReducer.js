import anecdotesServices from "../services/anecdotesServices";

const anecdoteReducer = (state = [], action) => {
  if(action.type === 'INITIAL_STATE') {
  return action.data
  }
  if (action.type === "VOTE") {
    const id = action.data.id;
    const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
    const anecdoteChanged = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    return state.map((anecdote) =>
      anecdote.id !== id ? anecdote : anecdoteChanged
    );
  }
  if (action.type === "CREATE_NEW") {
    return state.concat(action.data);
  }
  
  return state;
};

export const initialState = () => {
  return async dispatch => {
    const initialAnecdotes = await anecdotesServices.getAll()
    dispatch(
      {
        type: 'INITIAL_STATE',
        data: initialAnecdotes
      }
    )
  }
}
export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};
export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newNote = await anecdotesServices.createNew(content)
    dispatch({
      type: "CREATE_NEW",
      data: newNote
    })
  }
};

export default anecdoteReducer;
