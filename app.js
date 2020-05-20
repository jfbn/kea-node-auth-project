const express = require('express');
const app = express();

const config = require('./config/config.json');

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const session = require('express-session');
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}))

//app.use(express.static('pages'));

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 8 // limit each IP to 8 requests per windowMs
});

app.use('/signup', authLimiter);
app.use('/login', authLimiter);


// set up knex with objection
const { Model } = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js');
const knex = Knex(knexfile.development);
Model.knex(knex);

// setup routes with app
const pagesRoute = require('./routes/pages.js');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
app.use(pagesRoute);
app.use(userRoute);
app.use(authRoute);

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on the port", PORT);
})