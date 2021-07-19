import React from "react";

function RenderAllPeople({ filterResult, persons }) {
  return (
    <div>
      <ul>
        {!filterResult
          ? persons.map((person, index) => (
              <li key={index}>
                {person.name} {person.number}
              </li>
            ))
          : filterResult.map((person, index) => (
              <li key={index}>
                {person.name} {person.number}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default RenderAllPeople;
