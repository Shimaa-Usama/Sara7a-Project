const app = require('express').Router();
const messageModel = require('../models/message.model')
app.get('/messages', async(req, res) => {
    const fullURL = req.protocol + '://' + req.headers.host + '/user/' + req.session.userID
    if(req.session.isLoggedIn){
        const messages = await messageModel.find({ userID: req.session.userID })
        res.render('messages', {messages, name:req.session.name, fullURL, isLoggedIn: req.session.isLoggedIn})
    }else{
        res.redirect('/login')
    }
});

module.exports = app;