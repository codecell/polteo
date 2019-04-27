const express = require('express');
const router = express.Router();

const parties = [
    {
         "id": 1,
         "name": "PPP",
         "hqAddress": "12 Montgomery rd",
         "logoUrl": "broom.png"
    },
   {
         "id": 2,
         "name": "CAP",
         "hqAddress": "10 Downing str",
         "logoUrl": "packer.png"
    },
    {
         "id": 3,
         "name": "ABC",
         "hqAddress": "4 Aso rock str",
         "logoUrl": "dustbin.jpg"
    }
];


router.get('/api/v1/parties', (req, res) => {
    res.send(parties);
});

router.post('/api/v1/parties', (req, res) => {
     const party = {
         "id": parties.length + 1,
         "name": req.body.partyname,
         "hqAddress": req.body.hqAddress,
         "logourl": req.body.logourl
     }
     res.send(party);
});













module.exports = router;