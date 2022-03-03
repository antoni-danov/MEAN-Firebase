const mongoose = require('mongoose');

module.exports = (app) => {
    var URI;

    if (app.get('env') === 'development') {
        URI = process.env.MONGODB_URI_LOCAL;
    } else if (app.get('env') === 'production') {
        URI = process.env.MONGODB_URI;
    }

    mongoose.connect(`${URI}`,
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