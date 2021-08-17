const express = require('express');
const upload = require('express-fileupload');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const app= express();
const User = require('./models/user')

const authRouter = require('./routes/auth')
mongoose.connect('mongodb://localhost:27017/login',
 {
     useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(()=>{
        console.log("db connect");  
    })


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
const sessionConfig = {
    secret:'we need nlog',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(upload());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/',(req,res)=>{
    if(req.files){
        console.log(req.files);
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./upload/'+filename, function(err){
            if(err){
                res.send(err);
            }else 
            {
                res.send("file Upload")
            }
        })
    }
})

app.use(authRouter)

app.listen(3000,()=>{
    console.log("server start 3000")
})