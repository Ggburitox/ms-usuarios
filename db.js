const { Pool } = require('pg');

const pool = new Pool({
    host: '172.31.22.204',
    port: 5432,
    user: 'root',
    password: 'usuarios1234',
    database: 'ms-usuarios'
});

module.exports = pool;
