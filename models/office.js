const Joi = require('joi');

const offices = [
    {
        id: 1,
        type: "federal",
        name: "presidency"
    },
    {
        id: 2,
        type: "federal",
        name: "house of assembly"
    },
    {
        id: 3,
        type: "state",
        name: "Governorship"
    }
];

function validateOffice(office) {
    const schema = {
        type: Joi.string().min(2).max(255).required(),
        name: Joi.string().min(2).max(255).required()
    };
    return Joi.validate(office, schema);
}

module.exports.offices = offices;
module.exports.validateOffice = validateOffice;