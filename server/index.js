const verifyUser = require('./middleware/verifyUser')
const express = require('express')
const { 
  teams, users, getUserByEmail, getUserById, getTeamById, addUser, 
  addTeam, deleteUserByEmail, getTeamByName, assignTeamToUser, 
  getTemplateNamesByTeamId, getTemplates, assignTemplateToTeam, 
  getQuestionsByTemplateName, addEntry, addResponses, getAllEntries, addTemplate, addQuestions
} = require('./src/db/functions.js')
const bcrypt = require('bcrypt')
const app = express()
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3001

app.use(express.json());

const secret = process.env.JWT_SECRET;

app.use(cors());

app.get('/db/teams', verifyUser, async (req, res) => {
  const teamsData = await teams()
  res.json(teamsData)
});

app.get('/db/templates', verifyUser, async (req, res) => {
  const { teamid } = req.headers;
  const templatesData = await getTemplates(teamid === undefined ? undefined : Number(teamid));
  res.json(templatesData);
});

app.post('/db/templates', verifyUser, async (req, res) => {
  const { templateName, templateDescription, questions, teamName, teamId } = req.body;
  await addTemplate(templateName, templateDescription, teamName);
  await addQuestions(questions, teamId);
  await assignTemplateToTeam(teamId, templateName);
  res.status(201).json(req.body);
});

app.post('/db/form', verifyUser, async (req, res) => {
  const { template_name } = req.body;
  const questions = await getQuestionsByTemplateName(template_name);
  res.json(questions);
})

app.post('/db/entries', verifyUser, async (req, res) => {
  const { token } = res.locals;
  const {template_name, user_id, data} = req.body;
  const entry = await addEntry(user_id, template_name);
  const entryId = entry.id;
  await addResponses(data, entryId);
  res.status(201).end();
})

app.post('/db/teamstemplates', verifyUser, async (req, res) => {
  const {templateName, teamId} = req.body
  await assignTemplateToTeam(teamId, templateName);
  res.status(201).json(req.body);
});

// MAYBE NOT USING
// app.get('/db/teams/:name', verifyUser, async (req, res) => {
//   const { name } = req.params;
//   const team = await getTeamByName(name.toLowerCase());
//   res.json(team)
// })

app.post('/db/teams', verifyUser, async (req, res) => {
  const { token } = res.locals;
  const {userId, teamName} = req.body
  await addTeam(teamName);
  const team = await getTeamByName(teamName.toLowerCase());
  await assignTeamToUser(userId, teamName)
  const updatedUser = await getUserById(userId)
  updatedUser.team_name = teamName;
  updatedUser.templates = [];
  delete updatedUser.password;
  res.json({user: updatedUser, token})
})

// ONLY FOR CHECKING THE DB CONTENT
// app.get('/db/users', verifyUser, async (req, res) => {
//   const usersData = await users()
//   res.json(usersData)
// })

app.patch('/db/users/:id', verifyUser,  async (req, res) => {
  try {
    const { token } = res.locals;
    const { id } = req.params;
    const { teamName } = req.body;
    await assignTeamToUser(id, teamName)
    const teamJoined = await getTeamByName(teamName.toLowerCase())
    const user = await getUserById(id)
    delete user.password
    const templateNames = await getTemplateNamesByTeamId(user.team_id);
    const templates = templateNames.map(item => item.name);
    user.templates = templates;
    user.team_name = teamJoined.name
    res.json({user, token})
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
})

app.get('/db/user', verifyUser, async (req, res) => {
  try {
    const { decodedToken, token } = res.locals;
    const user = await getUserByEmail(decodedToken.email);
    const team = user.team_id !== null ? await getTeamById(user.team_id) : null;
    const templateNames = await getTemplateNamesByTeamId(user.team_id);
    const templates = templateNames.map(item => item.name);
    user.templates = templates;
    delete user.password
    user.team_name = team !== null ? team.name : null;
    res.status(201).json({ token, user })
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
})

//ONLY FOR POSTMAN, NOT IMPLEMENTED IN FRONTEND
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
    user.team_name = team !== null ? team.name : null;
    const templateNames = await getTemplateNamesByTeamId(user.team_id);
    const templates = templateNames.map(item => item.name);
    user.templates = templates;
    delete user.password
    res.status(201).json({ token, user })
    return
  } else {
    res.status(400).json({ message: 'The details provided are not correct.' })
  }
});

app.post('/db/reports', verifyUser, async (req, res) => {
  const { token } = res.locals;
  const { team_id } = req.body; 
  const reports = await getAllEntries(team_id);
  
  res.json({reports, token})
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})