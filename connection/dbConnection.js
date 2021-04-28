const mysql = require('mysql');
const config = require('config');

function mySqlDbConnection () {
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
        })
        return db
};



module.exports = mySqlDbConnection