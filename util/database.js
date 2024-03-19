const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fsw1",
  password: "admin123",
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
