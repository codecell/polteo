 const Joi = require('joi');

const votes = [
    {
        id: 1,
        createdOn: new Date(),
        createdBy: 1,
        office: 1,
        candidate: 1
    },
    {
        id: 2,
        createdOn: new Date(),
        createdBy: 2,
        office: 1,
        candidate: 1
    },
    {
        id: 3,
        createdOn: new Date(),
        createdBy: 3,
        office: 1,
        candidate: 3
    }
];

function validateVote(vote) {
    const schema = {
        createdBy: Joi.number().min(1).max(255).strict().required(),
        office: Joi.number().min(1).max(255).strict().required(),
        candidate: Joi.number().min(1).max(255).strict().required(),
    };

    return Joi.validate(vote, schema);
}

module.exports.votes = votes;
module.exports.validateVote = validateVote; 