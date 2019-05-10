
module.exports = function (app) {
    const officesController = require('../controllers/offices');

    app.route('/api/v1/offices')
        .post(officesController.createOffice)
        .get(officesController.listAllOffices);

    app.route('/api/v1/offices/:id')
        .get(officesController.getOfficeById)
        .patch(officesController.updateOffice)
        .delete(officesController.removeOffice);    
}

