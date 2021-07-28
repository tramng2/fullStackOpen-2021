import React, { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import RenderAllPeople from "./components/RenderAllPeople";
import personService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterResult, setFilterResult] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

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
          personService
            .update(isDuplicate[0].id, newPersonObject)
            .then((res) => {
              setPersons(
                persons.map((person) => {
                  if (person.id === isDuplicate[0].id) {
                    return { ...person, number: newPersonObject.number };
                  } else return person;
                })
              );
              setMessage(`Changed ${newPersonObject.name}`);
              setMessageType("noti");
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            });
        }
        setNewPerson({ name: "", number: "" });
      } else {
        personService
          .create(newPersonObject)
          .then((returnedPerson) => {
            setPersons([...persons, returnedPerson]);
            setNewPerson({ name: "", number: "" });
            setMessage(`Added ${newPersonObject.name}`);
            setMessageType("noti");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setMessage(`${error.response.data.error}`);
            setMessageType("error");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    }
  };
  const handleDelete = (id) => {
    const personDeleting = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personDeleting.name}`)) {
      personService
        .deleteData(id)
        .then((res) => {
          const result = persons.filter((person) => person.id !== id);
          setPersons(result);
        })
        .catch((error) => {
          setMessage(
            `Information of ${personDeleting.name} has already been removed from server`
          );
          setMessageType("error");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter person={persons} handleFilter={handleFilter} />
      <Notification message={message} type={messageType} />

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
