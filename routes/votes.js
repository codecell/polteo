module.exports = function (app) {
    const votesController = require('../controllers/votes');

    app.route('/api/v1/votes')
        .post(votesController.postVote)
        .get(votesController.getVotes);

    app.route('/api/v1/votes/:id')
        .get(votesController.getVoteById)
        .patch(votesController.updateVoteById)
        .delete(votesController.removeVote);
}