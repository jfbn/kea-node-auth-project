const router = require('express').Router();
const path = require('path');
var parentDir = path.normalize(__dirname+"/..");

router.get('/', function (req, res, next) {
    if(req.session.isloggedin == true) {
        return res.sendFile(parentDir+'/pages/home.html');    
    }
    else {
        return res.sendFile(parentDir+'/pages/login.html');
    }
});

router.get('/signup', (req, res) => {
    return res.sendFile(parentDir+'/pages/signup.html');
});

router.get('/electives', (req, res) => {
    console.log("hej");
    return res.send({response: "HEJ"});
})

module.exports = router;