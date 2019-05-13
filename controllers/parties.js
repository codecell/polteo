const Joi = require('joi');
const Party = require('../models/party');

module.exports.createParty = async (req, res) => {
    try {
        const {error} = validateParty(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let partyProps = new Party(req.body);

        if(!partyProps.name || !partyProps.hqAddress) return res.status(400).json({error: true, message: 'please provide NAME & ADDRESS'});
    
        const party = await Party.createParty( partyProps.getProps() );
        return res.json( { status: 200, data: party} );
    
    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.listAllParties = async (req, res) => {
    try {
        const parties =  await Party.getParties();
        return res.json( { status : 200, data: parties } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }
};

module.exports.getPartyById = async (req, res) => {
    try {
        const party = await Party.getPartyById( req.params.id );
        return res.json( { status : 200, data: party } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.updateParty =  async (req, res) => {
    try {
        const updatedParty = await Party.updatePartyById(
            req.params.id,
            new Party(req.body)
        );
        return res.json( { status : 200, data: updatedParty } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.removeParty = async (req, res) => {
    try {
        const deletedParty = await Party.deleteParty(
            req.params.id
        );
        return res.send( { status : 200, data: deletedParty } ); 

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );;
    }    
};

function validateParty(party) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        hqAddress: Joi.string().min(2).max(55).required(),
        logoUrl: Joi.string().min(2).max(255)
    }
    return Joi.validate(party, schema);
}