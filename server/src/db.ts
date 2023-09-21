const Pool = require('pg').Pool

const pool = new Pool({
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWD,
    'database': process.env.DB,
    'host': process.env.HOST,
    'port':process.env.DB_PORT
})

module.exports = pool