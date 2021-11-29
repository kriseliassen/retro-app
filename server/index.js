const express = require('express')
const { teams, users, getUserByEmail, addUser, deleteUserByEmail } = require('./src/db/functions.js')
const bcrypt = require('bcrypt')
const app = express()
const port = 3001
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();

app.use(express.json());

const secret = process.env.JWT_SECRET;

app.get('/db/teams', async (req, res) => {
  const teamsData = await teams()
  res.json(teamsData)
})

app.get('/db/users', async (req, res) => {
  const usersData = await users()
  res.json(usersData)
})
app.delete('/db/users/:email', async (req, res) => {
  const { email } = req.params
  await deleteUserByEmail(email)
  res.json({message:`user ${email} has been deleted from our records`})
})

app.post('/db/users/signup', async (req, res) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)
  if (user) {
    res.status(400).json({ message: 'this email already exists, please sign in' })
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  await addUser({ ...req.body, password: hashedPassword })
  const token = await JWT.sign({ email }, secret, { expiresIn: '1h' })
  res.status(201).json({ token })
})

app.post('/db/users/login', async (req, res) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)
  if (!user) {
    res.status(400).json({ message: 'The details provided are not correct.' })
    return;
  }
  const passwordMatches = await bcrypt.compare(password, user.password)
  if (passwordMatches) {
    const token = await JWT.sign({ email }, secret, { expiresIn: '1h' })
    res.json({ token })
    return
  } else {
    res.status(400).json({ message: 'The details provided are not correct.' })
  }
})

app.post('/db', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})