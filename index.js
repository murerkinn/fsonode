const { response, request } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {

  console.log(request.body)

  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0

  const person = request.body

  if (!person.name) response.status(400).json({ error: 'you must provide a name' }).end()
  if (!person.number) response.status(400).json({ error: 'you must provide a number' }).end()

  const name = persons.find(p => p.name == person.name)

  if (name) response.status(400).json({ error: 'name must be unique' }).end()

  person.id = maxId + 1

  persons = persons.concat(person)
  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  let id = request.params.id
  let person = persons.find(p => p.id !== id)

  if (person) response.json(person)
  else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  let id = request.params.id
  let person = persons.find(p => p.id == id)

  if (person) response.status(204).end()
  else response.status(404).end()
})

app.get('/info', (request, response) => {
  let msg = `<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date()}</p>`
  response.send(msg)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)