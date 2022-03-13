const app = require('express').Router();
const messageModel = require('../models/message.model')
const userModel = require('../models/user.model')

let userID
app.get('/user/:id', async(req, res) => {
    userID = req.params.id
    let userUrl= await userModel.findOne({_id:userID})
    res.render('user',{name:userUrl.name, isLoggedIn: req.session.isLoggedIn})
});

app.post('/handleMessages', async(req, res) => {
    const { message } = req.body
    console.log(req.body.message);
    await messageModel.insertMany({ message, userID })
    res.redirect('/user/'+ userID)
});
module.exports = app;