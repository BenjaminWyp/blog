const express = require('express');
const checkLogin = require('../middlewares/check').checkLogin;

module.exports = function(app){
    app.get('/', checkLogin, (req, res) => {
        res.redirect('/posts');
    });

    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    app.use('/comments', require('./comments'));
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404')
        }
    })
};
