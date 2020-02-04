const express = require('express');
const router = express.Router();
const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
router.post('/', async (req, res)=>{
    const result = await User.findOne({username:req.body.username});
    if(!result) {
        const error = {result:"failed", message: req.body.username +' Invalid Username or password' }
        return res.status(400).send(error);
    } 
    const validPassword = await bcrypt.compare(req.body.password, result.password);
    if(!validPassword) {
        const error = {result:"failed",message:'Invalid Username or password' }
        return res.status(400).send(error)
    }
    const token = jwt.sign({_id:result._id, username:result.username}, 'jwtPrivateKey')
    delete result.password;
    const response = {result:"success", user:result, jwt:token};
    res.header('x-auth-token', token).send(response);
});

module.exports = router;