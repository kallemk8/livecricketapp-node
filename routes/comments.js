const express = require('express');
const router = express.Router();
const {Comments} = require('../model/comments');
router.get('/', async (req,res)=>{
    var result = await Comments
    .find()
    .populate('author')
    
    .populate('parentcommentid')
    
    res.send(result);
    
});
router.get('/postcomments/:id', async (req,res)=>{
    var result = await Comments
    .find()
    .populate('author','firstName email')
    var results = result.filter(comment => comment.postID == req.params.id && comment.parentcommentid == null );
    res.send(results);
    
});

router.get('/subcomments/:id', async (req,res)=>{
    var result = await Comments
    .find()
    .populate('author','firstName email');
    var results = result.filter(comment => comment.parentcommentid == req.params.id)
    res.send(results);
    
});
router.post('/', async (req, res)=>{
     
    const result = new Comments({
        comment:req.body.comment,
        author:req.body.author,
        publishedDate:req.body.publishedDate,
        postID:req.body.postID,
        parentcommentid:req.body.parentcommentid
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
    const result = await Comments.findByIdAndUpdate(req.params.id, {
        $set: {
            comment:req.body.comment,
            author:req.body.author,
            publishedDate:req.body.publishedDate,
            postID:req.body.postID,
            parentcommentid:req.body.parentcommentid
        }
    }, {new:true});
    res.send(result);
});
router.get('/:id',  async (req, res)=>{
    try{
        const result = await Comments.findById(req.params.id);
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
        const result = await Comments.findByIdAndRemove(req.params.id);
        res.send(result);
    }
    catch(ex){
        let error = { result:"failed", message:ex.message }
        res.status(400).send(error);
    }
    
});
module.exports = router;