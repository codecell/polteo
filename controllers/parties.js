const Joi = require('joi');
const Party = require('../models/party');

module.exports.createParty = (req, res) => {

    const {error} = validateParty(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let partyProps = new Party(req.body);

    if(!partyProps.name || !partyProps.hqAddress) return res.status(400).json({error: true, message: 'please provide NAME & ADDRESS'});
    
    Party.createParty(
        partyProps.getProps(),
        (err, party) => {
        if(err) return res.status(500).send({error: true, message: 'internal server error'});
        res.json(party);
        }
    );
};

module.exports.listAllParties = (req, res) => {
    Party.getParties((err, parties) => {
        if(err) return res.status(500).send({error: true, message: 'internal server error'});
        res.send(parties);
    });
};

module.exports.getPartyById = (req, res) => {
    Party.getPartyById(req.params.id, (err, party) => {
        if(err) return res.status(500).send({error: true, message: 'internal server error'});
        res.send(party);
        }
    );
};

module.exports.updateParty = (req, res) => {
    Party.updatePartyById(
        req.params.id,
        new Party(req.body),
        (err, party) => {
            if(err) return res.status(500).send({error: true, message: 'internal server error'});
            res.send(party);
        }
    );
};

module.exports.removeParty = (req, res) => {
    Party.deleteParty(req.params.id, (err, party) => {
        if(err) return res.status(500).send({error: true, message: 'internal server error'});
        res.send(party);
        }
    );
}

function validateParty(party) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        hqAddress: Joi.string().min(2).max(55).required(),
        logoUrl: Joi.string().min(2).max(255)
    }
    return Joi.validate(party, schema);
}