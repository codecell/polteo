const Joi = require('joi');

const users = [
    {
        id: 1,
        firstname: "alfredo",
        lastname: "di",
        othername: "stefano",
        email: "alfredo123@gmail.com",
        phoneNumber: "76894567",
        passportUrl: "alfredo.png",
        isAdmin: true
    },
    {
        id: 2,
        firstname: "onyeoma",
        lastname: "emeka",
        othername: "okadigbo",
        email: "onyeoma123@gmail.com",
        phoneNumber: "1234567",
        passportUrl: "onyeoma.png",
        isAdmin: false
    }

]

function validateUser(user) {
    const schema = {
        firstname: Joi.string().min(5).max(55).required(),
        lastname: Joi.string().min(2).max(55).required(),
        othername: Joi.string().min(2).max(55),
        email: Joi.string().email().min(2).max(55).required(),
        phoneNumber: Joi.string().min(5).max(55).required(),
        passportUrl: Joi.string().min(2).max(55),
        isAdmin: Joi.boolean()        
    }

    return Joi.validate(user, schema);
}

module.exports.users = users;
module.exports.validateUser = validateUser;