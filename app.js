const { urlencoded } = require('express');
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
var flash = require('connect-flash');

const mongoose = require('mongoose')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/sarahahApp',
  collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
app.use(flash());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: false }))



app.use(require('./routes/index.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/register.routes'))
app.use(require('./routes/messages.routes'))
app.use(require('./routes/user.routes'))


app.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    res.redirect('/')
  })
});

mongoose.connect('mongodb://localhost:27017/sarahahApp', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('connected');
});

app.listen(port, () => console.log(`Example app listening on port port!`))