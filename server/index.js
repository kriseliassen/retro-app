const express = require('express')
const { teams, users, getUserByEmail, addUser, addTeam, deleteUserByEmail, getTeamByName } = require('./src/db/functions.js')
const bcrypt = require('bcrypt')
const app = express()
const port = 3001
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(express.json());

const secret = process.env.JWT_SECRET;

app.use(cors());

app.get('/db/teams', async (req, res) => {
  const teamsData = await teams()
  res.json(teamsData)
})

app.get('/db/teams/:name', async (req, res) => {
  const { name } = req.params;
  const team = await getTeamByName(name.toLowerCase());
  res.json(team)
})

app.post('/db/teams', async (req, res) => {
  await addTeam(req.body.name);
  const team = await getTeamByName(req.body.name);
  console.log(team)
  res.json(team)
})

app.get('/db/users', async (req, res) => {
  const usersData = await users()
  res.json(usersData)
})

app.get('/db/user', async (req, res) => {
  try {
    const token = (req.headers.authorization.replace('Bearer ', '').replaceAll('"', ''));
    const decodedToken = JWT.verify(token, secret)
    const user = await getUserByEmail(decodedToken.email);
    res.status(201).json({ token, user: {name: user.first_name, id: user.id } })
  } catch (err) {
    res.status(401).json({ error: 'session expired, please login again' });
  }
  
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
  const createdUser = await getUserByEmail(email);
  const token = JWT.sign({ email }, secret, { expiresIn: '1d' })
  res.status(201).json({ token, user: {name: createdUser.first_name, id: createdUser.id } })
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
    const token = JWT.sign({ email }, secret, { expiresIn: '1d' })
    res.status(201).json({ token, user: {name: user.first_name, id: user.id } })
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