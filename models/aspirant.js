const pool = require('../db');

const Aspirant = function (aspirant) {
    this.office_id = aspirant.office_id;
    this.party_id = aspirant.party_id;
    this.candidate_id = aspirant.candidate_id;
};

Aspirant.prototype.getProps = function () {
    return [this.office_id, this.party_id, this.candidate_id];
};

Aspirant.createAspirant = async (aspirantProps) => {
    try {
         const result = await pool.query(
            'INSERT INTO aspirants (office_id, party_id, candidate_id) VALUES ($1, $2, $3) RETURNING *',
            aspirantProps
        );
         return result.rows[0];

    } catch (err) {
         if(err) return err;
    }    
};

Aspirant.getAspirants = async () => {
    try {
         const result = await pool.query( 'SELECT * FROM aspirants ORDER BY id ASC' );
         return result.rows;

    } catch (err) {
         if(err) return err;
    }    
};

Aspirant.getAspirantById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM aspirants WHERE id = $1',
            [id]
        );
        return result.rows[0];

    } catch (err) {
         if(err) return err;
    }    
};

Aspirant.updateAspirant = async (id, aspirant) => {
    try {
         const result = await pool.query(
            'UPDATE aspirants SET office_id = $1, party_id = $2, candidate_id = $3 WHERE id = $4 RETURNING *',
            aspirant.getProps().concat([id])
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Aspirant.deleteAspirant = async (id) => {
    try {
         const result = await pool.query(
            'DELETE FROM aspirants WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
        
    } catch (err) {
        if(err) return err;
    }    
}

module.exports = Aspirant;
