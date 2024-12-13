// src/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Your PostgreSQL username
    host: 'localhost', // Database server
    database: 'postgres', // Your PostgreSQL database name
    password: 'Group3', // Your PostgreSQL password
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;
