const express = require('express')
const { teams, users } = require('./src/db/functions.js')
const app = express()
const port = 3001

app.use(express.json())

app.get('/db/teams', async (req, res) => {
  const teamsData = await teams()
  console.log(teamsData)
  res.json(teamsData)
})

app.get('/db/users', async (req, res) => {
  const usersData = await users()
  console.log(usersData)
  res.json(usersData)
})
app.post('/db/users/signup', async (req, res) => {
  const { email, password, firstName, lastName} = req.body
  console.log('signed up', req.body)
  res.json({email})
})

app.post('/db/users/login', async (req, res) => {
  const { email, password } = req.body
  console.log('logged in', email)
  res.json({email})
})

app.post('/db', (req, res) => {

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})