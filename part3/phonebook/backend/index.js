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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.get("/info", (request, response, next) => {
  const receivedDate = new Date();
  Person.find({})
    .then((persons) => {
      response.send(
        `<div><p>Phonebook has info for ${persons.length} people</p><p>${receivedDate}</p></div>`,
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((p) => {
      response.json(p);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((p) => {
      if (p) {
        response.json(p);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete({ _id: id })
    .then((p) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

  Person.findOne({ name: person.name })
    .then((p) => {
      if (p) {
        return response.status(400).json({
          error: "name must be unique",
        });
      } else {
        const p = new Person({
          name: person.name,
          number: person.number,
        });

        p.save().then((savedPerson) => {
          return response.json(savedPerson);
        });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const person = request.body;
  Person.findByIdAndUpdate(
    id,
    {
      name: person.name,
      number: person.number,
    },
    { new: true },
  )
    .then((p) => {
      response.json(p);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
