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
//   GET_BY_ID: 'SELECT * FROM products WHERE id = $1',
//   GET_ALL_PRODUCT_GROUPS: 'SELECT * FROM productgroups',
//   ADD_PRODUCT: `
//   INSERT INTO Products (name, description, price, ProductGroupId)
//   VALUES ($1, $2, $3, $4)
//   `,
//   UPDATE_BY_ID: `
//   UPDATE Products
//   SET name = $1, description = $2, price = $3, ProductGroupId = $4
//   WHERE id = $5
//   `,
//   DELETE_BY_ID: 'DELETE FROM products WHERE id = $1',
//   GETT_BY_GROUP_NAME: `
//   SELECT * FROM productgroups
//   INNER JOIN products
//   ON
//   productgroups.id = products.productgroupid
//   where lower(productgroups.name) = $1
//   `,
};
