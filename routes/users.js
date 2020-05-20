const router = require('express').Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    const allUsersWithElectives = await User.query().select().withGraphFetched('electives');
    return res.send({ response: allUsersWithElectives })
})

router.get('/setsessionvalue', (req, res) => {
    req.session.isloggedin = true;
    return res.send({ response: "OK" });
});

router.get('/getsession', (req, res) => {
    return res.send({ session: req.session });
});

router.get('/querystrings/', (req, res) => {
    console.log(req.query);
    return res.send({ response: "OK" });
})




module.exports = router;