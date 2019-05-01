const { petitions, validatePetition } = require('../models/petition');
const express = require('express');
const router = express.Router();

router.get('/api/v1/petitions', (req, res) => {
    res.send(petitions);
});

router.get('/api/v1/petitions/:id', (req, res) => {
    const petition = petitions.find( p => p.id === parseInt(req.params.id));
    if(!petition) return res.status(404).send('petition with given ID not found');

    res.send(petition);
});

router.post('/api/v1/petitions', (req, res) => {
    const { error } = validatePetition(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const petition = {
        id: petitions.length + 1,
        createdOn: req.body.createdOn,
        createdBy: req.body.createdBy,
        office: req.body.office,
        body: req.body.body
    };

    petitions.push(petition);
    res.send(petition);    
});

router.patch('/api/v1/petitions/:id', (req, res) => {
    const petition = petitions.find(p => p.id === parseInt(req.params.id));
    if(!petition) return res.status(404).send('Petition with given ID not found');

    petition.createdBy = req.body.createdBy;
    petition.office = req.body.office;
    petition.body = req.body.body;

    res.send(petition);
});

router.delete('/api/v1/petitions/:id', (req, res) => {
    const petition = petitions.find(p => p.id === parseInt(req.params.id));
    if(!petition) return res.status(404).send('Petition with given ID not found');

    const index = petitions.indexOf(petition);
    petitions.splice(index, 1);

    res.send(petition);
});


module.exports = router;


