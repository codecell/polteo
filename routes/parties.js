
module.exports = function (app) {
    const partiesController = require('../controllers/parties');

    app.route('/api/v1/parties')
        .get(partiesController.listAllParties)
        .post(partiesController.createParty);
    app.route('/api/v1/parties/:id')
        .get (partiesController.getPartyById)
        .patch(partiesController.updateParty)
        .delete(partiesController.removeParty)   
};
