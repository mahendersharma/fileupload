const express = require('express')
const router = express();
router.get('/welcome',(req,res)=>{
    res.send('welcome')
})



module.exports = router;