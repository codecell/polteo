const { candidates, validateCandidate } = require('../models/candidate');
const express = require('express');
const router = express.Router();


router.get('/api/v1/candidates', (_req, res) => {
    res.send(candidates);
});

router.get('/api/v1/candidates/:id', (req, res) => {
    const candidate = candidates.find(c => c.id === parseInt(req.params.id));
    if(!candidate) return res.status(404).send('Aspirant with given not found');

    res.send(candidate);
});

router.post('/api/v1/candidates', (req, res) => {
    const { error } = validateCandidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const candidate = {
        id: candidates.length + 1,
        office: req.body.office,
        party: req.body.party,
        candidate: req.body.candidate
    };

    candidates.push(candidate);
    res.send(candidate);
});

router.patch('/api/v1/candidates/:id', (req, res) => {
    const candidate = candidates.find(c => c.id === parseInt(req.params.id));
    if(!candidate) return res.status(404).send('Candidate with given id not found');

    candidate.officeId = req.body.officeId;
    candidate.partyId = req.body.partyId;
    candidate.candidateId = req.body.candidateId;

    res.send(candidate);
});

router.delete('/api/v1/candidates/:id', (req, res) => {
    const candidate = candidates.find(c => c.id === parseInt(req.params.id));
    if(!candidate) return res.status(404).send('Candidate with given id not found');

    const index = candidates.indexOf(candidate);
    candidates.splice(index, 1);
    
    res.send(candidate);
});

module.exports = router;
