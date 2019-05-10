const Joi = require('joi');
const Vote = require('../models/vote');

module.exports.postVote = (req, res) => {
    const { error } = validateVote(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const voteProps = new Vote(req.body);
    if(!voteProps.office_id || !voteProps.candidate_id) return res.status(400).send('Please input missing ID');

    Vote.createVote(
        voteProps.getProps(),
        (err, votes) => {
            if(err) return res.status(500).send({error: true, message: 'Internal server Error'});
            res.send(votes);
        }
    );
};

module.exports.getVotes = (_req, res) => {
    Vote.getVotes(
        (err, votes) => {
            if(err) return res.status(500).json({error: true, message: 'Internal Servre Error'});
            res.send(votes);
        }
    );
};

module.exports.getVoteById = (req, res) => {
    Vote.getVoteById(
        req.params.id,
        (err, vote) => {
            if(err) return res.status(500).json({error: true, message: 'Internal Server Error'});
            res.send(vote);
        }
    );
};

module.exports.updateVoteById = (req, res) => {
    Vote.updateVote(
        req.params.id,
        new Vote(req.body),
        (err, vote) => {
            if(err) return res.status(500).send({error: true, message: 'Internal Server Error'});
            res.send(vote);
        }
    );
};

module.exports.removeVote = (req, res) => {
    Vote.deleteVote(
        req.params.id,
        (err, vote) => {
            if(err) return res.status(500).send({error: true, message: 'Internal Server Error'});
            res.send(vote);
        }
    );
};


function validateVote(vote) {
    const schema = {
        createdBy: Joi.number().min(1).max(255).strict().required(),
        office_id: Joi.number().min(1).max(255).strict().required(),
        candidate_id: Joi.number().min(1).max(255).strict().required(),
    };

    return Joi.validate(vote, schema);
}