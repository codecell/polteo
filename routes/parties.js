const { parties, validateParty } = require('../models/party');
const express = require('express');
const router = express.Router();


router.get('/api/v1/parties', (_req, res) => {
    res.send(parties);
});

router.get('/api/v1/parties/:id', (req, res) => {
    const party = parties.find(p => p.id === parseInt(req.params.id));
        if (!party) return res.status(404).send('Party with given ID not found');
    
    res.send(party);
});

router.post('/api/v1/parties', (req, res) => {

     const { error } = validateParty(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const party = {
         id: parties.length + 1,
         name: req.body.name,
         hqAddress: req.body.hqAddress,
         logoUrl: req.body.logoUrl
     };

     parties.push(party);
     res.status(201).send(party);
});

router.patch('/api/v1/parties/:id', (req, res) => {

    const party = parties.find(p => p.id === parseInt(req.params.id));
    if(!party) return res.status(404).send('Party with given ID not found');

    const { error } = validateParty(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    party.name = req.body.name;
    party.hqAddress = req.body.hqAddress;
    party.logoUrl = req.body.logoUrl;  

    res.send(party);
});

router.delete('/api/v1/parties/:id', (req, res) => {
   const party = parties.find(p => p.id === parseInt(req.params.id));
   if(!party) return res.status(404).send('party with given ID not found');

   const index = parties.indexOf(party);
   parties.splice(index, 1);
   
   res.send(party);
});


module.exports = router;
