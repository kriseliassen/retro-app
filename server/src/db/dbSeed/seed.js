const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const fs = require('fs');

const teams = fs.readFileSync('./src/db/dbSeed/teams.sql').toString();
const users = fs.readFileSync('./src/db/dbSeed/users.sql').toString();

console.log(teams)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});
pool.connect();

pool.query(users).then(() => console.log('added user'));