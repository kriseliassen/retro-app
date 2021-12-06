const { Pool } = require('pg');
const dotenv = require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});
pool.connect();

module.exports = {
  query: async (text, params) => pool.query(text, params),
  GET_ALL_TEAMS: 'SELECT * FROM teams ORDER BY name ASC',
  GET_ALL_USERS: 'SELECT * FROM users',
  GET_USER_BY_EMAIL: `
    SELECT * FROM users
    WHERE lower(email) = $1
    `,
  GET_USER_BY_ID: `
  SELECT * FROM users
  WHERE id = $1
  `,
  ADD_USER: `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
  `,
  DELETE_USER_BY_EMAIL: `
    DELETE FROM users
    WHERE email = $1
    `,
  ADD_TEAM: `
    INSERT INTO teams (name)
    VALUES ($1)
  `,
  GET_TEAM_BY_NAME: `
    SELECT * FROM teams
    WHERE lower(name) = $1
  `,
  ASSIGN_TEAM_TO_USER: `
    UPDATE users SET team_id =
    (SELECT id FROM teams WHERE name = $1)
    WHERE id = $2
  `,
  GET_TEAM_BY_ID: `
    SELECT * FROM teams
    WHERE id = $1
  `,
  GET_TEMPLATENAMES_BY_TEAMID: `
    SELECT name FROM teamstemplatesview
    WHERE id = $1
  `,
  GET_TEMPLATES: 'SELECT * FROM templates',
  ASSIGN_TEMPLATE_TO_TEAM: `
    INSERT INTO teamstemplates (team_id, templates_id)
    VALUES (
    (SELECT id FROM teams WHERE id = $1), (SELECT id FROM templates WHERE name = $2)
    )
  `,
  GET_TEMPLATEID_BY_NAME: `
    SELECT id FROM templates
    WHERE name = $1
  `,
  GET_QUESTIONS_BY_TEMPLATEID:  `
    SELECT * FROM questions
    WHERE templates_id = $1
  `,
  ADD_ENTRY:`
    INSERT INTO entries
    (templates_id, user_id, date)
    VALUES
    (
    (SELECT id from templates WHERE name = $1),
    (SELECT id from users WHERE id = $2),
    now()
    )
  `,
  GET_LATEST_ENTRY_FOR_USER_TEMPLATE_MATCH: `
    SELECT * FROM entries 
    WHERE
    templates_id = (SELECT id FROM templates WHERE name = $1) 
    AND
    user_id = $2 
    AND
    id=(SELECT max(id) FROM entries)
  `,
  ADD_RESPONSE: `
    INSERT INTO responses
    (entries_id, questions_id, text)
    VALUES
    (
    (SELECT id from entries WHERE id = $1),
    (SELECT id from questions WHERE id = $2),
    $3
    )
  `,
  GET_ALL_ENTRIES: `
  select entries_id, date, user_id, users.team_id, 
  entries.templates_id, name AS template_name, 
  questions_id, question, text AS response, type, responses.id as responseId, 
  first_name, last_name
from entries
join templates
on entries.templates_id = templates.id
left JOIN questions
ON questions.templates_id = entries.templates_id 
JOIN responses
ON responses.entries_id = entries.id and responses.questions_id = questions.id
JOIN users
  ON users.id = entries.user_id

  WHERE users.team_id = $1
  ORDER BY date DESC
  `,
};
