const {Router} = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mySqlDbConnection = require('../connection/dbConnection');

const router = Router();

const db = mySqlDbConnection()

// /api/auth/registration
router.post('/registration', 
[
    body('email', 'Incorrect email').isEmail(),
    body('login', 'Please enter your login (Login must be unique and must not be an email)').not().isEmail().not().isEmpty().trim(),
    body('real_name', 'Please enter your name').not().isEmpty().trim(),
    body('password', 'Minimal password length is 8 symbols').isLength({min: 8}),
    body('birth_date', 'plese enter your date of birth').not().isEmpty(),
    body('country', 'Select your country').not().isEmpty(),
    body('agreement', 'Please agree with term').not().isEmpty()
],
async (req, res)=> {
    
     try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorect registration data"
            })
        
        }
        
        const { email, login, real_name, password, birth_date, country, agreement } = req.body;
        
        let hashedPassword = await bcrypt.hash(password, 8);

        db.query(
            'SELECT * FROM userreg_data WHERE email = ? OR login = ?',
            [email, login],
            (err, results) => {
                if (err) throw err
                if (results.length === 0) {
                    db.query(
                        'INSERT INTO userreg_data SET ?',
                        {
                            email: email, 
                            login: login, 
                            real_name: real_name, 
                            password: hashedPassword, 
                            birth_date: birth_date, 
                            country: country, 
                            agreement: agreement,
                        },
                        (err, results) => {
                            if (err){
                                throw err
                            } else {
                            const secretPhrase = config.get('jwt_secret');

                            const token = jwt.sign(
                                { Userid: results.insertId }, 
                                secretPhrase, 
                                { expiresIn: '1h' }
                            ); 

                            res.json({ 
                                token, 
                                userId: results.insertId,
                                userEmail: email,  
                                userName: real_name,
                                message: 'User created'
                                })                               
                                
                            }
                        }
                    )
                    
                } else {
                    return res.status(400).json({
                        message: 'The same email or login is already exist'
                    })
                }

            }
        )
            
    } catch (e) {
        res.status(500).json({message:'Do not working? Try again!'})
        console.log(e)
    }


  
});

// /api/auth/login
router.post('/login', 
async (req, res)=> {
    try {

    const { username, password} = req.body

    if (!username || !password) {
        return res.status(400).json({
            message: 'Please provide an email or login and password'
        })
    }

    
    db.query( 'SELECT * FROM userreg_data WHERE email = ? OR login = ?', [username, username], async (error, results) => {

        let IsCompared = await bcrypt.compare(password, results[0].password)
       
        if ( !results || !IsCompared) {
            res.status(401).json({
                message: 'Incorrect username or password'
            })
        } else {
            const secretPhrase = config.get('jwt_secret');

            const token = jwt.sign(
                { Userid: results[0].id }, 
                secretPhrase, 
                { expiresIn: '1h' }
            ); 

            res.json({ 
                token, 
                userId: results[0].id,
                userEmail: results[0].email,  
                userName: results[0].real_name,
                })
            }
    })


    } catch (e) {
        console.log(e)
    }
});

// /api/auth/country_list
router.get('/country_list', async (req, res)=>{
    try {
        db.query('SELECT country_name FROM countries', async (err, result) => {
            if (result.length === 0) {
                res.status(400).json({
                    message: 'Something going wrong, try again!'
                })
            } 
            res.status(200).json({
                countries: result
            })
        } )
    } catch (e) {
        console.log(e)
    }
})

module.exports = router