const express = require('express');
const config = require('config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port')

app.listen(PORT, ()=> console.log(`App has been started on port: ${PORT}`))