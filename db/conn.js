const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'php',
    password: '123456',
    database: 'node_mysql'
})

module.exports = pool