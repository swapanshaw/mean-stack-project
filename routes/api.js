const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./dbUtils');

router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'ilovemeanstack', function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});


router.get('/pgs', function (req, res, next) {
    db.pg_list.find(function (err, doc) {
        if (err) {
            res.send(err);
        }
        res.json(doc);
    })
});


router.get('/pgs/:id', function (req, res, next) {
    let id = req.params.id;
    db.pg_list.findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        if (err) {
            throw err;
        }

        res.json(doc);
    })
});


// save to db
router.post('/pgs/save', function (req, res, next) {
    let payload = req.body;
    if (!payload.name) {
        res.status(400);
        res.send('Invalid payload');
    } else {
        db.pg_list.save(payload, function (err, doc) {
            if (err) {
                throw err;
            }

            res.json(doc);
        });
    }
});

// delete a record

router.delete('/pgs/:id', function (req, res, next) {
    let id = req.params.id;
    db.pg_list.remove({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        if (err) {
            throw err;
        }

        res.json(doc);
    })
});


// update record
module.exports = router;