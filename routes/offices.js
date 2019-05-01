const { offices, validateOffice } = require('../models/office');
const express = require('express');
const router = express.Router();


router.get('/api/v1/offices', (_req, res) => {
    res.send(offices);
});


router.get('/api/v1/offices/:id', (req, res) => {
    const office = offices.find(o => o.id === parseInt(req.params.id));
    if(!office) return res.status(404).send('Office with given ID not found');

    res.send(office);
});

router.post('/api/v1/offices', (req, res) => {        
    const { error } = validateOffice(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const office = {
        id: offices.length + 1,
        type: req.body.type,
        name: req.body.name
    };
    
    offices.push(office);
    res.status(201).send(office);
});

router.patch('/api/v1/offices/:id', (req, res) => {
    const office = offices.find(o => o.id === parseInt(req.params.id));
    if(!office) return res.status(401).send('Office with given ID not found');

    const { error } = validateOffice(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    office.type = req.body.type;
    office.name = req.body.name;

    res.send(office);
});

router.delete('/api/v1/offices/:id', (req, res) => {
    const office = offices.find(o => o.id === parseInt(req.params.id));
    if(!office) return res.status(401).send('Office with given ID not found');

    const index = offices.indexOf(office);
    offices.splice(index, 1);
    res.send(office);
});

module.exports = router;