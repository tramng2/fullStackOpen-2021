const getId = () => (100000 * Math.random()).toFixed(0);
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

export const initialState = (anecdotes) => {
  return {
    type: 'INITIAL_STATE',
    data: anecdotes
  }
}
export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};
export const createNewAnecdote = (content) => {
  return {
    type: "CREATE_NEW",
    data: {
      content,
      votes: 0,
      id: getId(),
    },
  };
};

export default anecdoteReducer;
