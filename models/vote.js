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

Vote.createVote = (voteProps, result) => {
    pool.query(
        'INSERT INTO votes (createdOn, createdBy, office_id, candidate_id) VALUES ($1, $2, $3, $4) RETURNING *',
        voteProps,
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows[0]);
        }
    );
};

Vote.getVotes = (result) => {
    pool.query(
        'SELECT * FROM votes ORDER BY id ASC',
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
};

Vote.getVoteById = (id, result) => {
    pool.query(
        'SELECT * FROM votes WHERE id = $1',
        [id],
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
};

Vote.updateVote = (id, vote, result) => {
    pool.query(
        'UPDATE votes SET createdOn = $1, createdBy = $2, office_id = $3, candidate_id = $4 WHERE id = $5 RETURNING *',
        vote.getProps().concat([id]),
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
};

Vote.deleteVote = (id, result) => {
    pool.query(
        'DELETE FROM votes WHERE id = $1 RETURNING *',
        [id],
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
};
module.exports = Vote;
 