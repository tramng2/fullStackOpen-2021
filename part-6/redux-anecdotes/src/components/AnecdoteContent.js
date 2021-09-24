import React from "react";
import { addVote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import { initNoti, setNoti } from "../reducers/notificationReducer";

function AnecdoteContent() {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter) {
      anecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.includes(filter)
      );
    }
    return anecdotes;
  });
  const dispatch = useDispatch();
  anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  });
  const upVote = (anecdote, content) => {
    dispatch(addVote(anecdote));
    dispatch(setNoti(`You voted dkmmm${content}`));
    setTimeout(() => {
      dispatch(initNoti());
    }, 1000)
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            {" "}
            has {anecdote.votes}{" "}
            <button onClick={() => upVote(anecdote, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteContent;
