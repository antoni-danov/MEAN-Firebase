const userController = require('../controllers/userController');
const professionalController = require('../controllers/professionalController');

module.exports = (app) => {
    app.use('/user', userController);
    app.use('/professional', professionalController);
};