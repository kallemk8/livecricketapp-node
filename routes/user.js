const express = require('express');
const router = express.Router();
const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
router.get('/', auth, async (req,res)=>{
    const users = await User
    .find()
    .sort({name:1});
    res.send(users);
});

router.post('/', async (req, res)=>{
    const result = await User.findOne({username:req.body.username});
    if(result) {
        const error = {result:"failed", message: result.username+' already exists try another username' }
        return res.status(400).send(error);
    } 
    const salt = await bcrypt.genSalt(10);
    let password = "";
    if(req.body.password){
        password = await bcrypt.hash(req.body.password, salt);
    }
    
    const user = new User({
        username:req.body.username,
        password:password,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        displayPic:req.body.displayPic,
        gender:req.body.gender,
        DOB:req.body.DOB
    });
    try {
        const result = await user.save();
        const token = jwt.sign({_id:result._id}, 'jwtPrivateKey');
        res.header('x-auth-token', token).send(result);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message}
        res.status(400).send(error);
    }
});

router.put('/:id', auth, async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            displayPic:req.body.displayPic,
            gender:req.body.gender,
            DOB:req.body.DOB
        }
    }, {new:true});
    res.send(user);
});
router.get('/:id', auth, async (req, res)=>{
    try{
        const result = await User.findById(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});

router.delete('/:id',auth, async (req,res)=>{
    try{
        const result = await User.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = { result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});
module.exports = router;