const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'prueba_tecnica', 
  password: '123', 
  port: 5432,
});

module.exports = pool;