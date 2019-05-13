const Joi = require('joi');
const Office = require('../models/office');

module.exports.createOffice =  async (req, res) => {
    try {
        const {error} = validateOffice(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let officeProps = new Office(req.body);
        if(!officeProps.type || !officeProps.name) return res.status(400).json({error: true, message: 'please provide NAME/TYPE of oofice'});

        const office = await Office.createOffice( officeProps.getProps() );
        return res.send( { status : 200, data: office } );
    
    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }
    
};

module.exports.listAllOffices = async (req, res) => {
    try {
        const offices = await Office.getOffices();
        return res.json( { status : 200, data: offices } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.getOfficeById = async (req, res) => {
    try {
        const office = await Office.getOfficeById( req.params.id );
        return res.send( { status : 200, data: office } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }   
}

module.exports.updateOffice = async (req, res) => {
    try {
        const updatedOffice = await Office.updateOfficeById(
            req.params.id,
            new Office(req.body)
        );
        return  res.send( { status : 200, data: updatedOffice } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.removeOffice = async (req, res) => {
    try {
        const deletedOffice = await Office.deleteOffice( req.params.id );
        return res.send( { status : 200, data: deletedOffice } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

function validateOffice(office) {
    const schema = {
        type: Joi.string().min(2).max(255).required(),
        name: Joi.string().min(2).max(255).required()
    };
    return Joi.validate(office, schema);
}