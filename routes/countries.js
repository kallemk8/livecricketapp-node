const express = require('express');
const router = express.Router();
const {Countries} = require('../model/countries');
router.get('/', async (req,res)=>{
    const result = await Countries
    .find()
    .sort({name:1});
    res.send(result);
});
router.post('/', async (req, res)=>{
     
    const user = new Countries({
        name:req.body.name,
        subname:req.body.subname,
        aboutUs:req.body.aboutUs,
        displayPic:req.body.displayPic,
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

router.put('/:id',  async (req, res)=>{
    const result = await Countries.findByIdAndUpdate(req.params.id, {
        $set: {
            name:req.body.name,
            subname:req.body.subname,
            aboutUs:req.body.aboutUs,
            displayPic:req.body.displayPic,
        }
    }, {new:true});
    res.send(result);
});
router.get('/:id',  async (req, res)=>{
    try{
        const result = await Countries.findById(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});

router.delete('/:id', async (req,res)=>{
    try{
        const result = await Countries.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = { result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});
module.exports = router;