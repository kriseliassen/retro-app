const express = require('express')
const { teams, users, getUserByEmail, addUser } = require('./src/db/functions.js')
const bcrypt = require('bcrypt')
const app = express()
const port = 3001
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();

app.use(express.json());

const secret = process.env.JWT_SECRET;

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
  // check if email exist in DB
  const user = await getUserByEmail(email)
  // if yes return 400 message
  if(user) {
    res.status(400).json({message: 'this email already exists, please sign in'})
    return;
  }
  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  // add the user to DB
  await addUser({...req.body, password: hashedPassword})
  // send the token
  const token = await JWT.sign({email},secret,{expiresIn: '1h'})
  res.status(201).json({token})
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