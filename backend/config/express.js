const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = (app) => {

    app.use('/static', express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(cors({ origin: '*' }));
    app.use(express.static('public'));

    app.use((req, res, next) => {

        if (!req.url.includes('favicon')) {

            console.log('????', req.method, req.url);

            if (req.user) {
                console.log('Known user', req.user.email);
            }
        }

        next();
    });
};