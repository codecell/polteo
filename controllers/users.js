const Joi = require('joi');
const User = require('../models/user');


module.exports.listAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if(err) res.status(500).send({error: true, message: 'internal server error'});
        res.send(users);
    });
};
module.exports.createUser = (req, res) => {

    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let userProps = new User(req.body);
    
    if(!userProps.firstname || !userProps.lastname) res.status(400).send({error: true, message: 'please provide f/l name'});

    User.createUser(userProps.getProps(),
        (err, user) => {
        if(err) return res.status(500).send({error: true, message: 'internal server error'});
        res.json(user);
    });
};

module.exports.getUserById = (req, res) => {
    User.getUserById(req.params.id, (err, user) =>{
        if(err) return res.send(err);
        res.json(user);
    });
};

module.exports.updateUser = function (req, res) {
    User.updateUserById(req.params.id, new User(req.body), (err, user) => {        
        if(err) return res.send(err);
        res.json(user);
    });
};

module.exports.removeUser = (req, res) => {
    User.deleteUser(req.params.id, (err, user) => {
        if(err) return res.send(err);
        res.json({message: 'User successfully Deleted'});
    });
};

function validateUser(user) {
    const schema = {
        firstname: Joi.string().min(5).max(255).required(),
        lastname: Joi.string().min(2).max(255).required(),
        othername: Joi.string().min(2).max(255),
        email: Joi.string().email().min(2).max(255).required(),
        phoneNumber: Joi.string().min(5).max(255).required(),
        passport: Joi.string().min(2).max(255),
        isAdmin: Joi.boolean()        
    }

    return Joi.validate(user, schema);
}