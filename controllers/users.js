const Joi = require('joi');
const User = require('../models/user');

module.exports.postUser = async (req, res) => {
    try {
        const {error} = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let userProps = new User(req.body);
    
        if(!userProps.firstname || !userProps.lastname) res.status(400).send({error: true, message: 'please provide f/l name'});

        const user = await User.createUser(
        userProps.getProps()
        );
        return res.json(
            { status : 200, data: user }
        );   
    }
    catch(err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }    
        );
    };
};

module.exports.listAllUsers = async (req, res) => {   
   
    try {
        const users = await User.getUsers();
        return res.json({ status : 200, data: users });

    } catch(err){
        if(err) return res.status(500).send(
            { status: 500, error: err.message }    
        );
    }
};


module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        return res.json({ status : 200, data: user }); 
    }
    catch(err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.updateUser = async (req, res) => {
    
    try{
        const updatedUser = await User.updateUserById(
            req.params.id,
            new User(req.body)
        );
        return res.json({ status : 200, data: updatedUser });
    }
    catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }   
};

module.exports.removeUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteUser(req.params.id);
        return res.json({ status : 200, data: deletedUser });

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }   
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