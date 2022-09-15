const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "todo",
  password: process.env.DB_PASSWORD || "123456789",
  port: process.env.DB_PORT || 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
