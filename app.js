const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('config');

const app = express();

app.use(cors());
app.use(express.json({ extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
    } )
}

const PORT = config.get('port')

app.listen(PORT, ()=> console.log(`App has been started on port: ${PORT}`))