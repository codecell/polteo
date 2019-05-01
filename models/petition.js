const Joi = require('joi');

const petitions = [
    {
        id: 1,
        craetedOn: new Date(),
        createdBy: 1,
        office: 1,
        body: "voting for presidential elections at ward 3 horrible, kids as yound 12 were voting."
    },
    {
        id: 2,
        craetedOn: new Date(),
        createdBy: 2,
        office: 1,
        body: "voting for presidential elections at ward 5 rigged in broad day light, ballot boexe snatched."
    },
    {
        id: 3,
        craetedOn: new Date(),
        createdBy: 3,
        office: 2,
        body: "governorship elections neva happened, i'v video elections staff manually thumbprinting papers themselves."
    }
];

function validatePetition(petition) {
    const schema = {
        createdBy: Joi.number().min(1).max(255).required(),
        office: Joi.number().min(1).max(255).required(),
        body: Joi.string().min(100).max(2000).required()
    }
    return Joi.validate(petition, schema);
}

module.exports.petitions = petitions;
module.exports.validatePetition = validatePetition;