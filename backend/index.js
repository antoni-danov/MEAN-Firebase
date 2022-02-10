const express = require('express');
PORT = process.env.PORT || 3000;
require('dotenv').config();
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routerConfig = require('./config/routes');

start();
async function start() {
    const app = express();

    databaseConfig(app);
    expressConfig(app);
    routerConfig(app);

    app.listen(PORT, () => {
        console.log(`The server is listening on port ${PORT}`);
    });
}
