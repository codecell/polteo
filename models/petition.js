const pool = require('../db');

const Petition = function (petition) {
    this.createdOn = new Date();
    this.createdBy = petition.createdBy;
    this.office_id = petition.office_id;
    this.body = petition.body;
}

Petition.prototype.getProps = function () {
    return [this.createdOn, this.createdBy, this.office_id, this.body];
};

Petition.createPetition = async (petitionProps) => {
    try {
        const result = await pool.query(
            'INSERT INTO petitions (createdOn, createdBy, office_id, body) VALUES ($1, $2, $3, $4) RETURNING *',
            petitionProps
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }     
};

Petition.getPetitions = async () => {
    try {
        const result = await pool.query( 'SELECT * FROM petitions ORDER BY id ASC' );
        return result.rows;

    } catch (err) {
        if(err) return err;
    }    
};

Petition.getPetitionById = async (id) => {
    try {
        const result =  await pool.query(
            'SELECT * FROM petitions WHERE id = $1',
            [id]
        );
        return result.rows;

    } catch (err) {
        if(err) return err;
    }    
};

Petition.updatePetition = async (id, petition) => {
    try {
        const result = await pool.query(
            'UPDATE petitions SET createdOn = $1, createdBy = $2, office_id = $3, body = $4 WHERE id = $5 RETURNING *',
            petition.getProps().concat([id])
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Petition.deletePetition = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM petitions WHERE id = $1 RETURNING *',
            [id]
        );

        return result.rows[0];
    } catch (err) {
        if(err) return err;
    }   
};

module.exports = Petition;
