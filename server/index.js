const express = require('express')
const { teams } = require('./src/db/functions.js')
const app = express()
const port = 3001

app.get('/db/teams', async (req, res) => {
  const teamsData = await teams()
  console.log(teamsData)
  res.json(teamsData)
})

app.post('/db', (req, res) => {

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})