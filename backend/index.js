const express = require('express');
require('dotenv').config();
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routerConfig = require('./config/routes');

start();
async function start(){
    const app = express();

    databaseConfig(app);
    expressConfig(app);
    routerConfig(app);
    
    app.listen(process.env.PORT, ()=>{
        console.log(`The server is listening on port ${process.env.PORT}`);
    });
}
