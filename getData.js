const express =require('express')
const router= express.Router();
const practice=require('./practiceModel')
router.use(express.json());
router.get('/practice/:id',async(req,res)=>{
    console.log("getttttttttttttt");
    try{
        const model=await practice.findById(req.params.id)
        res.json(model);
    }
    catch(err)
    {
        console.log("Error is",err)
    }
});
module.exports=router;