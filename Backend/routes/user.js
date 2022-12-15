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

router.get('/allusers',async (req,res,next) => {
    try{
         await UserController.getAllUsers(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }   
});

router.get('/pendingusers',async (req,res,next) => {
    try{
         await UserController.getNonApprovedUsers(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }   
});

router.post('/deleteuser/:username',async (req,res,next) => {
    try{
         await UserController.deleteUser(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }   
});

router.patch('/approveuser/:username',async (req,res,next) => {
    try{
        await UserController.approveUser(req,res,next);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports = router;