const { votes, validateVote } = require('../models/vote');
const express = require('express');
const router = express.Router();


router.get('/api/v1/votes', (_req, res) => {
    res.send(votes);
});

router.get('/api/v1/votes/:id', (req, res) => {
    const vote = votes.find(v => v.id === parseInt(req.params.id));
    if(!vote) return res.status(404).send('Vote with given ID not found');

    res.send(vote);
});

router.post('/api/v1/votes', (req, res) => {
    const { error } = validateVote(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const vote = {
        id: votes.length + 1,
        createdOn: req.body.createdOn,
        createdBy: req.body.createdBy,
        office: req.body.office,
        candidate: req.body.candidate
    };

    votes.push(vote);
    res.send(vote);
});

router.patch('/api/v1/votes/:id', (req, res) => {
    const vote = votes.find(v => v.id === parseInt(req.params.id));
    if(!vote) res.status(404).send('Vote with given ID not found');

    vote.createdBy = req.body.createdBy;
    vote.office = req.body.office;
    vote.candidate = req.body.candidate;

    res.send(vote);
});

router.delete('/api/v1/votes/:id', (req, res) => {
    const vote = votes.find(v => v.id === parseInt(req.params.id));
    if(!vote) return res.status(404).send('Vote with given ID not found');

    const index = votes.indexOf(vote);
    votes.splice(index, 1);

    res.send(vote);
});

module.exports = router;