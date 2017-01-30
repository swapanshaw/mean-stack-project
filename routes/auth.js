const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('./dbUtils');

router.get('/users', function (req, res, next) {
    db.users.find(function (err, doc) {
        if (err) {
            res.send(err);
        }
        res.json(doc);
    })
});


router.post('/authenticate', function (req, res) {
    let _name = req.body.name;
    // find the user
    db.users.findOne({
        name: _name
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, 'ilovemeanstack', {
                    expiresIn : 60*60*24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

module.exports = router;