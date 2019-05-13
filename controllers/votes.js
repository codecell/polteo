const Joi = require('joi');
const Vote = require('../models/vote');

module.exports.postVote = async (req, res) => {
    try {
        const { error } = validateVote(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const voteProps = new Vote(req.body);
        if(!voteProps.office_id || !voteProps.candidate_id) return res.status(400).send('Please input missing ID');

        const vote = await Vote.createVote(voteProps.getProps());

        return res.json( { status : 200, data: vote } );
    
    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.getVotes = async (_req, res) => {
    try {
      const votes = await Vote.getVotes();
      return res.json( { status : 200, data: votes } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }
};

module.exports.getVoteById = async (req, res) => {
    try {
        const vote = await Vote.getVoteById( req.params.id );
        return res.json( { status : 200, data: vote } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.updateVoteById = async (req, res) => {
    try {
        const updatedVote = await Vote.updateVote(
            req.params.id,
            new Vote(req.body)
        );

        return res.json( { status : 200, data: updatedVote } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }    
};

module.exports.removeVote = async (req, res) => {
    try {
        const vote = await Vote.deleteVote(
            req.params.id
        );
        return res.json( { status : 200, data: vote } );

    } catch (err) {
        if(err) return res.status(500).send(
            { status: 500, error: err.message }
        );
    }   
};


function validateVote(vote) {
    const schema = {
        createdBy: Joi.number().min(1).max(255).strict().required(),
        office_id: Joi.number().min(1).max(255).strict().required(),
        candidate_id: Joi.number().min(1).max(255).strict().required(),
    };

    return Joi.validate(vote, schema);
}