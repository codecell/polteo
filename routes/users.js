const { users, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/api/v1/users', (req, res) => {
    res.send(users);
});

router.post('/api/v1/users', (req, res) => {
    
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = {
        id: users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        passportUrl: req.body.phoneNumber,
        isAdmin: req.body.isAdmin
    };
    users.push(user);
    res.send(user);
});


module.exports = router;