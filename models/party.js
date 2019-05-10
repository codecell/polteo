const pool = require('../db');

const Party = function (party) {
     this.name = party.name;
     this.hqAddress = party.hqAddress;
     this.logoUrl = party.logoUrl;
};

Party.prototype.getProps = function () {
    return [this.name, this.hqAddress, this.logoUrl];
};

Party.createParty = (partyProps, result) => {
     pool.query('INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1, $2, $3) RETURNING *',
          partyProps,
          (err, res) => {
               if(err) return result(err, null);
               result(null, res.rows[0]);
          }
     );
};

Party.getParties = (result) => {
     pool.query('SELECT * FROM parties ORDER BY id ASC',
          (err, res) => {
               if(err) return result(null, err);   
               result(null, res.rows);
     });
};

Party.getPartyById = (id, result) => {
     pool.query(
          'SELECT * FROM parties WHERE id = $1',
          [id],
          (err, res) => {
          if(err) return result(err, null);
          result(null, res.rows);
     });
};

Party.updatePartyById = (id, party, result) => {
     
     pool.query(
          'UPDATE parties SET name = $1, hqaddress = $2, logoUrl = $3 WHERE id = $4 RETURNING *',
           party.getProps().concat([id]),
          (err, res) => {
               if(err) return result(err, null);
               result(null, res.rows);
          }
     );
}

Party.deleteParty = (id, result) => {
     pool.query(
          'DELETE FROM parties WHERE id = $1 RETURNING*',
          [id],
          (err, res) => {
          if(err) return result(err, null);
          result(null, res.rows);
          }
     );
}

module.exports = Party;