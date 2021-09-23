import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteContent from "./components/AnecdoteContent";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initialState } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(initialState());
  }, [dispatch]);
  return (
    <div>
      <h2>A necdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteContent />
      <AnecdoteForm />
    </div>
  );
};

export default App;
