const express = require('express');
const router = express.Router();
const {CriNews} = require('../model/CriNews');
router.get('/', async (req,res)=>{
    var result = await CriNews
    .find()
   
    res.send(result);
    
});
router.post('/', async (req, res)=>{
     
    const result = new CriNews({
        cri_title:req.body.cri_title,
        author:req.body.author,
        publishedDate:req.body.publishedDate,
        subtitle:req.body.subtitle,
        desciption:req.body.desciption,
        tags:req.body.tags,
        displayPic:req.body.displayPic,
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
    const result = await CriNews.findByIdAndUpdate(req.params.id, {
        $set: {
            cri_title:req.body.title,
            author:req.body.author,
            publishedDate:req.body.publishedDate,
            subtitle:req.body.subtitle,
            desciption:req.body.desciption,
            tags:req.body.tags,
            displayPic:req.body.displayPic,
        }
    }, {new:true});
    res.send(result);
});
router.get('/:id',  async (req, res)=>{
    try{
        const result = await CriNews.findById(req.params.id);
        await result.populate('country').execPopulate()
        res.send(result);
    }
    catch(ex){
        let error = {result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});

router.delete('/:id', async (req,res)=>{
    try{
        const result = await CriNews.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = { result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});
module.exports = router;