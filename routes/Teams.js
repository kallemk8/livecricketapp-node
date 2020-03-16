const express = require('express');
const router = express.Router();
const {Teams} = require('../model/Teams');
router.get('/', async (req,res)=>{
    var result = await Teams
    .find()
    res.send(result);
    
});
router.post('/', async (req, res)=>{
     
    const result = new Teams({
        name:req.body.name,
        subname:req.body.subname,
        desc:req.body.desc,
        image:req.body.image,
        odirank:req.body.odirank,
        testrank:req.body.testrank,
        twtrank:req.body.twtrank,
        
    });
    try {
        const results = await result.save();
        res.send(results);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message}
        res.status(400).send(error);
    }
});

router.put('/:id',  async (req, res)=>{
    const result = await Teams.findByIdAndUpdate(req.params.id, {
        $set: {
            name:req.body.name,
            subname:req.body.subname,
            desc:req.body.desc,
            image:req.body.image,
            odirank:req.body.odirank,
            testrank:req.body.testrank,
            twtrank:req.body.twtrank,
        }
    }, {new:true});
    res.send(result);
});
router.get('/:id',  async (req, res)=>{
    try{
        const result = await Teams.findById(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});

router.delete('/:id', async (req,res)=>{
    try{
        const result = await Teams.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = { result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});
module.exports = router;