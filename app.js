const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const config = require('config');

const app = express();

app.use(cors());
app.use(express.json({ extended: true}));
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port')

app.listen(PORT, ()=> console.log(`App has been started on port: ${PORT}`))