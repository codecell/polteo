const pool = require('../db');

const User = function(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.othername = user.othername;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.passport = user.passport;
    this.isAdmin = user.isAdmin;
};
User.prototype.getProps = function() {
    return [this.firstname, this.lastname, this.othername, this.email, this.phoneNumber, this.passport, this.isAdmin];
};

User.createUser = async (userProps) => {   
    try {
        const result = await pool.query(
        'INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passport, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        userProps
        );
        return result.rows[0];        
    } catch(err) {
        if (err) return err;
        
    }  
};

User.getUsers = async () => {
    try{
        const users = await pool.query( 'SELECT * FROM users ORDER BY id ASC' );
            return users.rows;
            
    } catch(err){
        if (err) return err;
    }
};

User.getUserById = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1', 
            [userId] 
        );
        return result.rows[0];

    } catch(err) {
        if(err) return err;
    }    
};

User.updateUserById = async (id, user) => {
    try {
        const result = await pool.query(
            'UPDATE users SET firstname = $1, lastname = $2, othername = $3, email = $4, phoneNumber = $5, passport = $6, isAdmin = $7 WHERE id = $8 RETURNING *',
            [...Object.values(user), id]
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }   
};

User.deleteUser = async (id) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', 
        [id]
        );
        return result.rows[0];

    } catch (err) {
        if(err) return err;
    }    
};

module.exports = User;
