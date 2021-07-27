require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

// app.get("/info", (request, response) => {
//   const amount = persons.length;
//   const date = new Date();
//   const text = `
//   <div> <p>Phone book has infor for ${amount} people </p><p>${date}</p></div>`;
//   response.status(200).send(text);
// });

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// app.delete("/api/persons/:id", (request, response) => {
//   Person.deleteOne(request.params.id).then();
//   //   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "name or number is missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savePerson) => {
    response.json(savePerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
