const userCatalog = require('../routes/userCatalog');
const professionalCatalog = require('../routes/professionalCatalog');

module.exports = (app) => {
    app.use('/users', userCatalog);
    app.use('/professionals', professionalCatalog);
};