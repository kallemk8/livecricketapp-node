const express = require('express');
const router = express.Router();
const {Player} = require('../model/player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
router.get('/', async (req,res)=>{
    const result = await Player
    .find()
    .sort({name:1});
    res.send(result);
});
router.post('/', async (req, res)=>{
     
    const user = new Player({
        name:req.body.name,
        subname:req.body.subname,
        DOB:req.body.DOB,
        height:req.body.height,
        country:req.body.country,
        aboutUs:req.body.aboutUs,
        role:req.body.role,
        battingStyle:req.body.battingStyle,
        bowlingStyle:req.body.bowlingStyle,
        displayPic:req.body.displayPic,
        teams:req.body.teams
    });
    try {
        const result = await user.save();
        res.send(result);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message}
        res.status(400).send(error);
    }
});

router.put('/:id', auth, async (req, res)=>{
    const user = await Player.findByIdAndUpdate(req.params.id, {
        $set: {
            name:req.body.name,
            subname:req.body.subname,
            DOB:req.body.DOB,
            height:req.body.height,
            country:req.body.country,
            aboutUs:req.body.aboutUs,
            role:req.body.role,
            battingStyle:req.body.battingStyle,
            bowlingStyle:req.body.bowlingStyle,
            displayPic:req.body.displayPic,
            teams:req.body.teams
        }
    }, {new:true});
    res.send(user);
});
router.get('/:id',  async (req, res)=>{
    try{
        const result = await Player.findById(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});

router.delete('/:id',auth, async (req,res)=>{
    try{
        const result = await Player.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = { result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});
module.exports = router;