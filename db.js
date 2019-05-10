const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'polteo',
    password:  process.env.DB_PASS,
    port: 5432
});

module.exports = pool;