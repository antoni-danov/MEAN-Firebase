const userController = require('../controllers/userController');
const professionalController = require('../controllers/professionalController');

module.exports = (app) => {
    app.use('/users', userController);
    app.use('/professionals', professionalController);
};