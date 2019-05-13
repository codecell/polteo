const pool = require('../db');


const Office = function (office) {
    this.type = office.type;
    this.name = office.name;
}

Office.prototype.getProps = function () {
    return [this.type, this.name]
};

Office.createOffice = async (officeProps) => {
    try {
        const result = await pool.query(
            'INSERT INTO offices (type, name) VALUES ($1, $2) RETURNING *',
            officeProps
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Office.getOffices = async () => {
    try {
        const result = await pool.query( 'SELECT * FROM offices ORDER BY id ASC' );
        return result.rows;

    } catch (err) {
        if(err) return err;
    }    
};

Office.getOfficeById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM offices WHERE id = $1',
            [id]
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Office.updateOfficeById =  async (id, office) => {
    try {
        const result = await pool.query(
            'UPDATE offices SET type = $1, name = $2 WHERE id = $3 RETURNING *',
            office.getProps().concat([id]) 
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

Office.deleteOffice = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM offices WHERE id = $1 RETURNING*',
            [id]
        );
            return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
}
module.exports = Office;
