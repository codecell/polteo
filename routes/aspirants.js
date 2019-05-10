
module.exports = function (app) {
    const aspirantsController = require('../controllers/aspirants');

    app.route('/api/v1/aspirants')
        .post(aspirantsController.createAspirant)
        .get(aspirantsController.getAspirants);
    
    app.route('/api/v1/aspirants/:id')
        .get(aspirantsController.getAspirantById)
        .patch(aspirantsController.updateAspirantById)
        .delete(aspirantsController.removeAspirant); 
}