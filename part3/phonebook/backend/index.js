require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
var morgan = require("morgan");
const app = express();

app.use(express.static("dist"));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post"),
);

morgan.token("post", function (req, res) {
  if (req.method === "POST") return JSON.stringify(req.body);
});

const updatePersons = () => {
  Person.find({}).then((p) => {
    persons = p;
  });
};

let persons = [];
updatePersons();

app.get("/info", (request, response) => {
  const receivedDate = new Date();
  response.send(
    `<div><p>Phonebook has info for ${persons.length} people</p><p>${receivedDate}</p></div>`,
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((p) => {
    response.json(p);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete({ _id: id }).then((p) => {
    updatePersons();
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const person = request.body;

  if (!person.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  if (!person.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  const personExist = persons.find((p) => p.name === person.name);
  if (personExist) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const p = new Person({
    name: person.name,
    number: person.number,
  });

  p.save().then((savedPerson) => {
    persons = persons.concat(savedPerson);
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = request.body;
  Person.findByIdAndUpdate(
    id,
    {
      name: person.name,
      number: person.number,
    },
    { new: true },
  ).then((p) => {
    updatePersons();
    console.log(p);
    response.json(p);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
