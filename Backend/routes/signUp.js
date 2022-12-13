const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');
const UserController = require('../controllers/UserController');

 router.post('/',async (req,res,next) => {
   try{
        await UserController.createUser(req,res,next);
   }catch(err){
     res.status(400).json({message:err.message});
   }   
 });
 module.exports = router;
