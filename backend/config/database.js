const mongoose = require('mongoose');

module.exports = (app) => {

    mongoose.connect(`${process.env.MONGODB_URI}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log('connection error:', err);
    });
    db.once('open', () => {
        console.log("Database connection established successfully");
    });
}