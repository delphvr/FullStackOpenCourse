import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const updatePerson = (id, updatedPerson) => {
    personService
      .update(id, updatedPerson)
      .then((person) =>
        setPersons(persons.map((p) => (p.id === person.id ? person : p))),
      );
    setNewName("");
    setNewNumber("");
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = { name: newName, number: newNumber };
    const personExist = persons.find((person) => person.name === newName);
    if (personExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        updatePerson(personExist.id, newPersonObj);
      }
    } else {
      personService
        .create(newPersonObj)
        .then((response) => setPersons(persons.concat(response)));
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then((deletedPerson) =>
          setPersons(persons.filter((p) => p.id !== deletedPerson.id)),
        );
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
