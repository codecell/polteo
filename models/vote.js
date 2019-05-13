const pool = require('../db');

const Vote = function (vote) {
    this.createdOn = new Date();
    this.createdBy = vote.createdBy;
    this.office_id = vote.office_id;
    this.candidate_id = vote.candidate_id;
};

Vote.prototype.getProps = function () {
    return [this.createdOn, this.createdBy, this.office_id, this.candidate_id];
};

Vote.createVote = async (voteProps) => {
    try{
        const result = await pool.query(
            'INSERT INTO votes (createdOn, createdBy, office_id, candidate_id) VALUES ($1, $2, $3, $4) RETURNING *',
            voteProps
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Vote.getVotes = async () => {
    try {
        const result = await pool.query( 'SELECT * FROM votes ORDER BY id ASC' );
        return result.rows;

    } catch (err) {
        if(err) return err;
    }    
};

Vote.getVoteById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM votes WHERE id = $1',
            [id]
            );
            return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Vote.updateVote = async (id, vote) => {
    try {
        const result = await pool.query(
            'UPDATE votes SET createdOn = $1, createdBy = $2, office_id = $3, candidate_id = $4 WHERE id = $5 RETURNING *',
            vote.getProps().concat([id])
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Vote.deleteVote = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM votes WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};
module.exports = Vote;
 