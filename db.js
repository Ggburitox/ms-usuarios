const { Pool } = require('pg');
const pool = new Pool({
    host: 'IP_DE_TU_NUEVA_MV_DB', // Aquí va la IP de la nueva MV
    port: 5432,
    user: 'root',           // Debe coincidir con docker-compose
    password: 'usuarios1234', // Debe coincidir con docker-compose
    database: 'ms-usuarios'  // Debe coincidir con docker-compose
});
module.exports = pool;
