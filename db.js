const { Pool } = require('pg');

const pool = new Pool({
    host: '172.31.92.52 ' #cambiar_por_ip_privada,
    port: 5432,
    user: 'root',
    password: 'usuarios1234',
    database: 'ms-usuarios'
});

module.exports = pool;
