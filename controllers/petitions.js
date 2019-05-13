const Joi = require('joi');
const Petition = require('../models/petition');


module.exports.postPetition = async (req, res) => {
    try {
        const { error} = validatePetition(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const petitionProps = new Petition(req.body);
        if(!petitionProps.office_id || !petitionProps.createdBy) res.status(400).send('Please input Petitioner/Office Id');

        const petition = await Petition.createPetition( petitionProps.getProps() );
        return res.json( { status : 200, data: petition } );
    
    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.getPetitions = async (_req, res) => {
    try {
        const petitions = await Petition.getPetitions();
        return res.send( { status : 200, data: petitions } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.getPetitionById = async (req, res) => {
    try {
        const petition = await Petition.getPetitionById( req.params.id );
        return res.json( { status : 200, data: petition } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.updatePetitionById = async (req, res) => {
    try {
        const updatedPetition = await Petition.updatePetition(
            req.params.id,
            new Petition(req.body)
        );
        return res.json( { status : 200, data: updatedPetition } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }   
};

module.exports.removePetition = async (req, res) => {
    try {
        const deletedPetition = await Petition.deletePetition( req.params.id );
        return res.send( { status : 200, data: deletedPetition } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

function validatePetition(petition) {
    const schema = {
        createdBy: Joi.number().min(1).max(255).required(),
        office_id: Joi.number().min(1).max(255).required(),
        body: Joi.string().min(100).max(2000).required()
    }
    return Joi.validate(petition, schema);
}