const Joi = require('joi');
const Office = require('../models/office');

module.exports.createOffice = (req, res) => {
    const {error} = validateOffice(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let officeProps = new Office(req.body);
    if(!officeProps.type || !officeProps.name) return res.status(400).json({error: true, message: 'please provide NAME/TYPE of oofice'});

    Office.createOffice(
        officeProps.getProps(),
        (err, office) => {
            if(err) return res.status(500).send({error: true, message: 'internal server error'});
            res.send(office);
        }
    );
} 

module.exports.listAllOffices = (req, res) => {
    Office.getOffices(
        (err, offices) => {
        if(err) return res.status(500).send({error: true, message: 'internal server error'});
        res.send(offices);
    })
};

module.exports.getOfficeById = (req, res) => {
    Office.getOfficeById(
        req.params.id,
        (err, office) => {
            if(err) return res.status(500).send({error: true, message: 'internal server error'});
            res.send(office);
        }
    );
}

module.exports.updateOffice = (req, res) => {
    Office.updateOfficeById(
        req.params.id,
        new Office(req.body),
        (err, office) => {
            if(err) return res.status(500).send({error: true, message: 'internal server error'});
            res.send(office);
        }
    );
}

module.exports.removeOffice = (req, res) => {
    Office.deleteOffice(
        req.params.id,
        (err, office) => {
            if(err) return res.status(500).send({error: true, message: 'internal server error'});
            res.send(office); 
        }
    );
}
function validateOffice(office) {
    const schema = {
        type: Joi.string().min(2).max(255).required(),
        name: Joi.string().min(2).max(255).required()
    };
    return Joi.validate(office, schema);
}