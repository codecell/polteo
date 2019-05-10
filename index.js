// const petitions = require('./routes/petitions');
const votesRoutes = require('./routes/votes');
const aspirantsRoutes = require('./routes/aspirants');
const officesRoutes = require('./routes/offices');
const partiesRoutes = require('./routes/parties');
const usersRoutes = require('./routes/users');
const express = require('express');

const app = express();

require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'polteo',
    password:  process.env.DB_PASS,
    port: 5432
});

app.use(express.json());

usersRoutes(app);
partiesRoutes(app);
officesRoutes(app);
aspirantsRoutes(app);
votesRoutes(app);
// app.use('/', petitions);

app.use(express.static('public'));

const port = process.env.port || 3000;
app.listen(port, () =>{
    console.log('Listening on port ' + port);
});