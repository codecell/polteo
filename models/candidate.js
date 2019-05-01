const Joi = require('joi');

const candidates = [
    {
        id: 1,
        office: 1,
        party: 1,
        candidate: 1 
    },
    {
        id: 2,
        office: 2,
        party: 2,
        candidate: 2 
    },
    {
        id: 3,
        office: 2,
        party: 1,
        candidate: 3 
    }
];

function validateCandidate(candidate) {
    const schema = {
        office: Joi.number().min(1).max(255).strict().required(),
        party: Joi.number().min(1).max(255).strict().required(),
        candidate: Joi.number().min(1).max(255).strict().required()
    }
    return Joi.validate(candidate, schema);
}
module.exports.candidates = candidates;
module.exports.validateCandidate = validateCandidate;