const app = require('express').Router();

app.get('/', (req, res) => {
    res.render('index', {isLoggedIn: req.session.isLoggedIn})
})

module.exports = app;