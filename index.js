const petitions = require('./routes/petitions');
const votes = require('./routes/votes');
const candidates = require('./routes/candidates');
const offices = require('./routes/offices');
const users = require('./routes/users');
const parties = require('./routes/parties');
const express = require('express');

const app = express();

app.use(express.json());
app.use('/', parties);
app.use('/', users);
app.use('/', offices);
app.use('/', candidates);
app.use('/', votes);
app.use('/', petitions);


app.use(express.static('public'));


const port = process.env.port || 3000;
app.listen(port, () =>{
    console.log('Listening on port ' + port);
});