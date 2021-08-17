const express = require('express');
const router = express();
const User = require('../models/user');
const passport = require('passport')

// router.get('/fakeUser',async(req,res)=>{

//    const user = new User({email:'mahendersharma9898@gmail.com',username:'mahender'});
// const newUser = await User.register(user,'123456')
// res.send(newUser);

// })

router.get('/register',(req,res)=>{
    res.render('./signup')
})

router.post('/register',async(req,res)=>{
    const user = new User({username:req.body.username,email:req.body.email})
const newUser = await User.register(user,req.body.password);
console.log(newUser)
res.redirect('/')
})


router.get('/login',(req,res)=>{
    res.render('./login')
})

router.post('/login',
passport.authenticate('local',{
    // successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}
)
,
(req,res)=>{
    req.flash('success','Login Successfully')
    res.redirect('/');
}
);

router.get('/logout',(req,res)=>{
    req.logout();
   
    res.redirect('/login');
})
module.exports = router;
