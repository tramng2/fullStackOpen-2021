import React, { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import RenderAllPeople from "./components/RenderAllPeople";
import personService from "./services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterResult, setFilterResult] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

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
    const newPersonObject = { name: newPerson.name, number: newPerson.number };
    if (newPerson.name && newPerson.number) {
      const isDuplicate = persons.filter((el) => el.name === newPerson.name);
      if (isDuplicate.length > 0) {
        if (
          window.confirm(
            `${newPerson.name} is already added to phonebook, replace the old number with the new one?`
          )
        ) {
          personService.update(isDuplicate[0].id, newPersonObject).then((res) => {
            setPersons(persons.map(person => {
              if (person.id === isDuplicate[0].id) {
                return { ...person, number: newPersonObject.number };
              } else return person;
            }))
          });
        }
        setNewPerson({ name: "", number: "" });
      } else {
        personService.create(newPersonObject).then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNewPerson({ name: "", number: "" });
        });
      }
    }
  };
  const handleDelete = (id) => {
    const [nameDeleting] = persons.filter((person) => person.id === id);
    if (window.confirm(`Delete ${nameDeleting.name}`)) {
      personService.deleteData(id).then((res) => {
        const result = persons.filter((person) => person.id !== id);
        setPersons(result);
      });
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
      <RenderAllPeople
        filterResult={filterResult}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
