const parties = require('./routes/parties');
const express = require('express');

const app = express();

app.use(express.json());
app.use('/', parties);


app.use(express.static('public'));


const port = process.env.port || 3000;
app.listen(port, () =>{
    console.log('Listening on port ' + port);
});