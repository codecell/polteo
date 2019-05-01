const Joi = require('joi');

const parties = [
    {
         id: 1,
         name: "PPP",
         hqAddress: "12 Montgomery rd",
         logoUrl: "broom.png"
    },
   {
         id: 2,
         name: "CAP",
         hqAddress: "10 Downing str",
         logoUrl: "packer.png"
    },
    {
         id: 3,
         name: "ABC",
         hqAddress: "4 Aso rock str",
         logoUrl: "dustbin.jpg"
    }
];

function validateParty(party) {
     const schema = {
         name: Joi.string().min(2).max(255).required(),
         hqAddress: Joi.string().min(2).max(55).required(),
         logoUrl: Joi.string().min(2).max(255)
     }
     return Joi.validate(party, schema);
 }

module.exports.parties = parties;
module.exports.validateParty = validateParty;