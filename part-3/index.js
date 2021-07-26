const { request, response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons);
});

app.get("/info", (request, response) => {
  const amount = persons.length;
  const date = new Date();
  const text = `
  <div> <p>Phone book has infor for ${amount} people </p><p>${date}</p></div>`;
  response.status(200).send(text);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.status(200).json(person);
  } else {
    response.status(404).end("Not found");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const checkDuplicate = persons.find((el) => el.name === person.name);
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }
  if (checkDuplicate) {
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }

  const personContent = request.body;
  personContent.id = Math.floor(Math.random() * 1000);

  persons = persons.concat(personContent);
  response.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
