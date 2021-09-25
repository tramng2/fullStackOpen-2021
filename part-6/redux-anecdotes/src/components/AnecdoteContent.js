import React from "react";
import { addVote } from "../reducers/anecdoteReducer";
import { initNoti, setNoti } from "../reducers/notificationReducer";
import { connect } from "react-redux";

function AnecdoteContent({ anecdotes, addVote, setNoti }) {
  const upVote = (anecdote, content) => {
    addVote(anecdote);
    setNoti(`You voted ${content}`, 5000);
  };
  return (
    <div>
      {anecdotes
        .sort(function (a, b) {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
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

const mapStateToProps = ({ anecdotes, filter }) => {
  if (filter) {
    anecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  }
  return {
    anecdotes,
    filter,
  };
};
const mapDispatchToState = {
  addVote, setNoti, initNoti
}
  

const ConnectedAnecdoteContent = connect(mapStateToProps,mapDispatchToState)(AnecdoteContent);

export default ConnectedAnecdoteContent;
