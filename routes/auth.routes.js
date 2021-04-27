const {Router} = require('express');
const {check, validationResults} = require('express-validator');
const bcrypt = require('bcryptjs');
const mySqlDbConnection = require('../connection/dbConnection');
const router = Router();

// /api/auth/registration
router.post('/registration', 
[
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimal password length is 8 symbols').isLength({min: 8})
],
async (req, res)=> {
    try {
        const errors = validationResults(req);

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorect registration data"
            })
        }

        const { email, login, real_name, password, birth_date, country, agreement	} = req.body;

        mySqlDbConnection()

        db.query('SELECT email FROM userreg_data WHERE email = ?', [email], (err, res) => {
            if(err) {
                console.log(err)
            } 

            if(res.length > 0) {
                return res.status(400).json({
                    message: "User with the same email is already exist"
                })
            }
            let hashedPassword = bcrypt.hash(password, 8);
        
        db.query(
            'INSERT INTO userreg_data SET ?', 
            {email: email, 
             login: login, 
             real_name: real_name, 
             password: hashedPassword, 
             birth_date: birth_date, 
             country: country, 
             agreement: agreement,
             created_at: new Date().toISOString()	},
            (err, res) => {
                if (err) {
                    console.log(err)
                }
                return res.status(201).json({
                    message: 'User registered'
                })
            })
        })
    } catch (e) {}
  
});

// /api/auth/login
router.post('/login', 
[
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('login', 'Enter login').exists(),
    check('password', 'Minimal password length is 8 symbols').exists()
],
(req, res)=> {
    const errors = validationResults(req);

    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Incorect login data"
        })
    }

    const { email, login, password} = req.body
});

module.exports = router