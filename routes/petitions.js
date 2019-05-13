module.exports = function (app) {
    const petitionsController = require('../controllers/petitions');

    app.route('/api/v1/petitions')
        .post(petitionsController.postPetition)
        .get(petitionsController.getPetitions);
    
    app.route('/api/v1/petitions/:id')
        .get(petitionsController.getPetitionById)
        .patch(petitionsController.updatePetitionById)
        .delete(petitionsController.removePetition);
}