const pool = require('../db');

const Aspirant = function (aspirant) {
    this.office_id = aspirant.office_id;
    this.party_id = aspirant.party_id;
    this.candidate_id = aspirant.candidate_id;
};

Aspirant.prototype.getProps = function () {
    return [this.office_id, this.party_id, this.candidate_id];
};

Aspirant.createAspirant = (aspirantProps, result) => {
    pool.query(
        'INSERT INTO aspirants (office_id, party_id, candidate_id) VALUES ($1, $2, $3) RETURNING *',
        aspirantProps,
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows[0]);
        }
    );
};

Aspirant.getAspirants = (result) => {
    pool.query(
        'SELECT * FROM aspirants ORDER BY id ASC',
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows); 
        }
    );
};

Aspirant.getAspirantById = (id, result) => {
    pool.query(
        'SELECT * FROM aspirants WHERE id = $1',
        [id],
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
};

Aspirant.updateAspirant = (id, aspirant, result) => {
    pool.query(
        'UPDATE aspirants SET office_id = $1, party_id = $2, candidate_id = $3 WHERE id = $4 RETURNING *',
        aspirant.getProps().concat([id]),
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }

    );
};

Aspirant.deleteAspirant = (id, result) => {
    pool.query(
        'DELETE FROM aspirants WHERE id = $1 RETURNING *',
        [id],
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
}

module.exports = Aspirant;
