const verifyUser = require('./middleware/verifyUser')
const express = require('express')
const { teams, users, getUserByEmail, getUserById, getTeamById, addUser, addTeam, deleteUserByEmail, getTeamByName, assignTeamToUser } = require('./src/db/functions.js')
const bcrypt = require('bcrypt')
const app = express()
const port = 3001
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(express.json());

const secret = process.env.JWT_SECRET;

app.use(cors());

app.get('/db/teams', verifyUser, async (req, res) => {
  const teamsData = await teams()
  res.json(teamsData)
})

// MAYBE NOT USING

// app.get('/db/teams/:name', verifyUser, async (req, res) => {
//   const { name } = req.params;
//   const team = await getTeamByName(name.toLowerCase());
//   res.json(team)
// })

app.post('/db/teams', async (req, res) => {
  const {userId, teamName} = req.body
  await addTeam(teamName);
  const team = await getTeamByName(teamName.toLowerCase());
  await assignTeamToUser(userId, teamName)
  const updatedUser = await getUserById(userId)
  delete updatedUser.password
  res.json({user: updatedUser, team: team})
})

app.get('/db/users', async (req, res) => {
  const usersData = await users()
  res.json(usersData)
})

app.patch('/db/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName } = req.body;
    await assignTeamToUser(id, teamName)
    const teamJoined = await getTeamByName(teamName.toLowerCase())
    const updatedUser = await getUserById(id)
    delete updatedUser.password
    res.json({user: {...updatedUser, team_name: teamJoined.name}})
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
})

app.get('/db/user', verifyUser, async (req, res) => {
  try {
    const { decodedToken } = res.locals;
    const user = await getUserByEmail(decodedToken.email);
    const team = user.team_id !== null ? await getTeamById(user.team_id) : null;
    delete user.password
    user.team_name = team !== null ? team.name : null;
    res.status(201).json({ token: decodedToken, user })
  } catch (err) {
    res.status(401).json({ error: err.message });
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
  const token = JWT.sign({ email }, secret, { expiresIn: '8h' })
  delete createdUser.password
  res.status(201).json({ token, user: {...createdUser, team_name: null} })
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
    const token = JWT.sign({ email }, secret, { expiresIn: '8h' })
    const team = user.team_id !== null ? await getTeamById(user.team_id) : null;
    delete user.password
    user.team_name = team !== null ? team.name : null;
    res.status(201).json({ token, user })
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