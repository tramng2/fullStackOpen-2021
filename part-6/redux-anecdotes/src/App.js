import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteContent from "./components/AnecdoteContent";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initialState } from "./reducers/anecdoteReducer";
import anecdotesServices from "./services/anecdotesServices";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesServices
      .getAll()
      .then((anecdotes) => dispatch(initialState(anecdotes)));
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
