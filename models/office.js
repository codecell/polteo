const pool = require('../db');


const Office = function (office) {
    this.type = office.type;
    this.name = office.name;
}

Office.prototype.getProps = function () {
    return [this.type, this.name]
}

Office.createOffice = (officeProps, result) => {
    pool.query(
        'INSERT INTO offices (type, name) VALUES ($1, $2) RETURNING *',
        officeProps,
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows[0]);
        }
    );
};

Office.getOffices = (result) => {
    pool.query(
        'SELECT * FROM offices ORDER BY id ASC',
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
};

Office.getOfficeById = (id, result) => {
    pool.query(
        'SELECT * FROM offices WHERE id = $1',
        [id],
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);  
        }
    );
};

Office.updateOfficeById = (id, office, result) => {
    pool.query(
        'UPDATE offices SET type = $1, name = $2 WHERE id = $3 RETURNING *',
        office.getProps().concat([id]),
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
};

Office.deleteOffice = (id, result) => {
    pool.query(
        'DELETE FROM offices WHERE id = $1 RETURNING*',
        [id],
        (err, res) => {
            if(err) return result(err, null);
            result(null, res.rows);
        }
    );
}
module.exports = Office;
