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
  GET_ALL_TEAMS: 'SELECT * FROM teams',
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
  `
};
