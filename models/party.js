const pool = require('../db');

const Party = function (party) {
     this.name = party.name;
     this.hqAddress = party.hqAddress;
     this.logoUrl = party.logoUrl;
};

Party.prototype.getProps = function () {
    return [this.name, this.hqAddress, this.logoUrl];
};

Party.createParty = async (partyProps) => {
     try {
          const result = await pool.query(
               'INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1, $2, $3) RETURNING *',
               partyProps
          );
          return result.rows[0];
     } catch (err) {
          if(err) return err;
     }     
};

Party.getParties = async () => {
     try {
          const result = await pool.query( 'SELECT * FROM parties ORDER BY id ASC' );
          return result.rows;

     } catch (err) {
          if(err) return err;
     }     
};

Party.getPartyById = async (id) => {
     try {
          const result = await pool.query(
               'SELECT * FROM parties WHERE id = $1',
               [id]
          );
          return result.rows[0];

     } catch (err) {
          if(err) return err;
     }     
};

Party.updatePartyById = async (id, party) => {
     try {
          const result = await pool.query(
               'UPDATE parties SET name = $1, hqaddress = $2, logoUrl = $3 WHERE id = $4 RETURNING *',
                party.getProps().concat([id])
          );
          return result.rows[0];

     } catch (err) {
          if(err) return err;
     }    
};

Party.deleteParty =  async (id) => {
     try {
          const result = await pool.query(
               'DELETE FROM parties WHERE id = $1 RETURNING*',
               [id]
          );
          return result.rows[0];

     } catch (err) {
          if(err) return err;
     }
};

module.exports = Party;