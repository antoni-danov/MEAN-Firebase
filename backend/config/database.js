const mongoose = require('mongoose');

module.exports = (app) => {

    mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@mean.sxrhp.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
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