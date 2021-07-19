import React, { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import RenderAllPeople from "./components/RenderAllPeople";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterResult, setFilterResult] = useState("");

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }, [])


  const handleFilter = (event) => {
    const filter = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value)
    );
    setFilterResult(filter);
  };
  
  const handleChange = (event) => {
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (newPerson.name && newPerson.number) {
      const isDuplicate = persons.filter((el) => el.name === newPerson.name);
      if (isDuplicate.length > 0) {
        alert(`${newPerson.name} is already added to phonebook`);
        setNewPerson({ name: "", number: "" });
      } else {
        setPersons([...persons, newPerson]);
        setNewPerson({ name: "", number: "" });
      }
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter person={persons} handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleChange={handleChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <RenderAllPeople filterResult={filterResult} persons={persons} />
    </div>
  );
};

export default App;
