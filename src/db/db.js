const mysql = require('mysql2');
require('dotenv').config();

// Create a "pool" = a set of reusable connections to MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Export the pool with Promise support so we can use async/await
module.exports = pool.promise();