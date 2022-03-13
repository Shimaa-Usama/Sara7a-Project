const app = require('express').Router();
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const {  validationResult } = require('express-validator')

const validation = require('../models/validation/register.validation')
app.get('/register', (req, res) => {
    res.render('register', {isLoggedIn: req.session.isLoggedIn, errors: req.flash('errors'), oldInputs:req.flash('oldInputs')})
});


app.post('/handleRegister',validation,async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body
    const errors = validationResult(req)
    console.log(errors.array());

    if(errors.isEmpty() == true){
        bcrypt.hash(password, 7, async function(err, hash) {
            await userModel.insertMany({name, email, password:hash})
            res.redirect('/login')
        })
        
    }else{
        req.flash('errors', errors.array() )
        req.flash('oldInputs', req.body )

        res.redirect('/register')

    }

});


module.exports = app;