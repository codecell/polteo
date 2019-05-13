
module.exports = function (app) {
    const usersController = require('../controllers/users');

    app.route('/api/v1/users')
        .get(usersController.listAllUsers)
        .post(usersController.postUser);
    
    app.route('/api/v1/users/:id')
        .get(usersController.getUserById)
        .patch(usersController.updateUser)
        .delete(usersController.removeUser);
};

