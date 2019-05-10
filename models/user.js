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

User.createUser = (userProps, result) => {   
pool.query('INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passport, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
    userProps, 
        (err, res) => {
       if(err) return  result(null, err);   
        result(null, res.rows[0]);
    });
};

User.getAllUsers = (result) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, res) => {
        if(err) return result(null, err);   
        result(null, res.rows);
    });
};

User.getUserById = (userId, result) => {

    pool.query('SELECT * FROM users WHERE id = $1', 
        [userId], 
        (err, res) => {
        if(err) return result(null, err);   
        result(null, res.rows); 
        }
    );
};

User.updateUserById = function (id, user, result) {
    
    pool.query(
    'UPDATE users SET firstname = $1, lastname = $2, othername = $3, email = $4, phoneNumber = $5, passport = $6, isAdmin = $7 WHERE id = $8 RETURNING *',
    [...Object.values(user), id],
    (err, res) => {
        if(err) return result(null, err); 
        result(null, res);
    });
};

User.deleteUser = (id, result) => {

    pool.query('DELETE FROM users WHERE id = $1 RETURNING *', 
        [id],
        (err, res) => {
            
            if(err) return result(null, err);   
            result(null, res.rows);
        });
};

module.exports = User;
