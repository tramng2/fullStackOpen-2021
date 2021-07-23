import React from "react";

function RenderAllPeople({ filterResult, persons, handleDelete }) {
  return (
    <div>
      <ul>
        {!filterResult
          ? persons.map((person, index) => (
              <div key={index}>
                <span>
                  {person.name} {person.number}
                </span>
                <button onClick={() => handleDelete(person.id)}>delete</button>
              </div>
            ))
          : filterResult.map((person, index) => (
              <div key={index}>
                <span>
                  {person.name} {person.number}
                </span>
                <button onClick={() => handleDelete(person.id)}>delete</button>
              </div>
            ))}
      </ul>
    </div>
  );
}

export default RenderAllPeople;
