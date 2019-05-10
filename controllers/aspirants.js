const Joi = require('joi');
const Aspirant = require('../models/aspirant');

module.exports.createAspirant = (req, res) => {
    const { error } = validateAspirant(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let aspirantProps = new Aspirant(req.body);
    if(!aspirantProps.party_id || !aspirantProps.office_id) return res.status(400).json({error: true, message: 'please provide correct PARTY/OFFICE ID'});

    Aspirant.createAspirant(
        aspirantProps.getProps(),
        (err, aspirant) => {
            if(err) return res.status(500).send({error: true, message: 'internal server error'});
            res.send(aspirant);
        }
    );
}

module.exports.getAspirants = (req, res) => {
    Aspirant.getAspirants(
        (err, aspirants) => {
            if(err) return res.status(500).send({error: true, message: 'Internal Server e'});
            res.send(aspirants);
        }    
    );
};

module.exports.getAspirantById = (req, res) => {
    Aspirant.getAspirantById(
        req.params.id,
        (err, aspirant) => {
            if(err) return res.status(500).send({error: true, message: 'Internal Server Error'});
            res.send(aspirant); 
        }
    );
};

module.exports.updateAspirantById = (req, res) => {
    Aspirant.updateAspirant(
        req.params.id,
        new Aspirant(req.body),
        (err, aspirant) => {
            if(err) return res.status(500).json({error: true, message: 'Internal Server Error'});
            res.send(aspirant);
        }
    );
};

module.exports.removeAspirant = (req, res) => {
    Aspirant.deleteAspirant(
        req.params.id,
        (err, aspirant) => {
            if(err) return res.status(500).json({error: true, message: 'Internal Server Error'});
            res.send(aspirant); 
        }
    );
};

function validateAspirant(aspirant) {
    const schema = {
        office_id: Joi.number().min(1).max(255).strict().required(),
        party_id: Joi.number().min(1).max(255).strict().required(),
        candidate_id: Joi.string().min(1).max(255).strict().required()
    }
    return Joi.validate(aspirant, schema);
}