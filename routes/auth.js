const router = require('express').Router();

const User = require("../models/User.js");


const bcrypt = require('bcrypt');
const saltRounds = 12;

router.post('/login', (req, res) => {
    //1. Get the data from the request
    const { username, password } = req.body;

    //2. Validate the data

    //3. Check if user exists and get their password
    User.query().select('username').where('username', username).then(foundUser => {
        
        User.query().select('password').where('username', username).then(foundPw => {
            bcrypt.compare(password, foundPw[0].password, (err, result) => {
                console.log(result);
                if(result) {
                    console.log("got in");
                    req.session.isloggedin = true;
                    req.session.username = foundUser[0].username;
                    return res.redirect('/');

                }
                else {
                    console.log("wrong password");
                    return res.send("wrong username or pw");
                }
            });
        });
    });
    

    //4. Bcrypt compare

    //5. Send a response based on comparison
    

});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        // password validation
        if (password.length < 8) {
            return res.status(400).send({ response: "Password must be 8 characters or longer" });
        } else {
            try {
                User.query().select('username').where('username', username).then(foundUser => {
                    if (foundUser.length > 0) {
                        return res.status(400).send({ response: "User already exists" });
                    } else {
                        bcrypt.hash(password, saltRounds).then(hashed => {
                            User.query().insert({
                                username,
                                password: hashed
                            }).then(createdUser => {
                                req.session.isloggedin = true;
                                req.session.username = username;
                                return res.redirect('/');
                            });
                        })
                    }

                });
            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the DB" });
            }
        }
    } else {
        return res.status(400).send({ response: "username or password missing" });
    }
});

router.get('/logout', (req, res) => {
    req.session.isloggedin = false;
    req.session.username = null;
    return res.redirect('/');
});

module.exports = router;