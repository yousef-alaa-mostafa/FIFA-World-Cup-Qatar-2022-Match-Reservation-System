const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/checkusername',async (req,res,next) => {
    try{
         await UserController.checkUsername(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }   
});

module.exports = router;