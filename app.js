const express = require('express');
const config = require('config');
const mysql = require('mysql');

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const db = mysql.createConnection({
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('pass'),
    database: config.get('db_name')
});

db.connect( (err)=> {
    if (err) {
        console.log(err)
    } else {
        console.log('Database conected...')
    }
});

const PORT = config.get('port')

app.listen(PORT, ()=> console.log(`App has been started on port: ${PORT}`))