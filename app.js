const express = require('express');
const config = require('config');
const mySqlDbConnection = require('./connection/dbConnection');

const app = express()

app.use(express.json({ extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

 mySqlDbConnection()

const PORT = config.get('port')

app.listen(PORT, ()=> console.log(`App has been started on port: ${PORT}`))