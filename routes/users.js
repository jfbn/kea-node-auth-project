const router = require('express').Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    const allUsersWithElectives = await User.query().select().withGraphFetched('electives');
    return res.send({ response: allUsersWithElectives })
})
dwdwdw
router.get('/querystrings/', (req, res) => {
    console.log(req.query);
    return res.send({ response: "OK" });
})




module.exports = router;