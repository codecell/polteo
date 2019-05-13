const Joi = require('joi');
const Aspirant = require('../models/aspirant');

module.exports.createAspirant =  async (req, res) => {
    try {
        const { error } = validateAspirant(req.body);
            if(error) return res.status(400).send(error.details[0].message);
    
        let aspirantProps = new Aspirant(req.body);
            if(!aspirantProps.party_id || !aspirantProps.office_id) return res.status(400).json({error: true, message: 'please provide correct PARTY/OFFICE ID'});
    
        const aspirant = await Aspirant.createAspirant( aspirantProps.getProps() );
        return res.send( { status : 200, data: aspirant } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
}

module.exports.getAspirants = async (_req, res) => {
    try {
         const aspirants = await Aspirant.getAspirants();
         return res.send( { status : 200, data: aspirants } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.getAspirantById = async (req, res) => {
    try {
         const aspirant = await Aspirant.getAspirantById( req.params.id );
         return res.json( { status : 200, data: aspirant } );
         
    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.updateAspirantById = async (req, res) => {
    try {
         const updatedAspirant = await Aspirant.updateAspirant(
            req.params.id,
            new Aspirant(req.body)
        );
        return res.json( { status : 200, data: updatedAspirant } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.removeAspirant = async (req, res) => {
    try {
         const deletedAspirant = await Aspirant.deleteAspirant(
            req.params.id
        );
        return res.send( { status : 200, data: deletedAspirant } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

function validateAspirant(aspirant) {
    const schema = {
        office_id: Joi.number().min(1).max(255).strict().required(),
        party_id: Joi.number().min(1).max(255).strict().required(),
        candidate_id: Joi.string().min(1).max(255).strict().required()
    }
    return Joi.validate(aspirant, schema);
}