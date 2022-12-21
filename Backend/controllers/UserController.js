const User = require('../models/userSchema');
const Match = require('../models/matchSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//create a new user
const createUser = async (req,res,next) => {
    try{
        const {firstName,lastName,password,username ,email, 
            birthdate, gender,nationality,role}=req.body;
        console.log(req.body);
            //check if the user already exists
            var user = await User.findOne({
                $or:[{username:username},{email:email}]
            });
            if(user){
                return res.status(400).json({message:'User already exists'});
            }
            user = new User({
                firstName:firstName,
                lastName:lastName,
                password:password,
                username:username,
                email:email,
                birthdate:birthdate,
                nationality:nationality,
                role:role,
                gender:gender,
            });
            //hash the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
            // create a token
            const token = user.generateJWT();
            console.log("token: "+token);
            //save the user
            await user.save();
            return res.status(201).header('x-auth-token',token).send({
                message:'Successful User signUp',
                data: {userId: user._id,role:user.role},
                "x-auth-token":token
            });

        }catch(err){
            res.status(400).json({message:err.message});
        }
};
const loginUser = async (req,res,next) => {
    try{
        const {username,password}=req.body;
        //check if the user already exists
        var user = await User.findOne({username:username});
        if(!user){
            return res.status(404).json({message:'User does not exist'});
        }
        //check if the password is correct
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(203).json({message:'Invalid Password'});
        }
        // create a token
        const token = user.generateJWT();
        return res.status(202).header('x-auth-token',token).send({
            message:'Successful User login',
            data: {userId: user._id,role:user.role},
            "x-auth-token":token
        }); 
    } 
        catch(err){
            res.status(400).json({message:err.message});
        }
};

const checkUsername = async (req,res,next) => {
    try{
        const {username}=req.body;
        console.log(req.body);
        //check if the user already exists
        var user = await User.findOne({username:username});
        if(!user){
            return res.status(400).json({bool: 'false',message:'Username does not exist'});
        }
        return res.status(200).send({ bool: 'true',message:'Username exists'});
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

const getAllUsers = async (req,res,next) => {
    try{
        const users = await User.find({$or:[{role:'Manager',approved:true},{role:'Fan'}]});
        res.status(200).json(users);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

const getNonApprovedUsers = async (req,res,next) => {
    try{
        const users = await User.find({approved:false,role:'Manager'});
        res.status(200).json(users);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

const deleteUser = async (req,res,next) => {
    try{
        const {username}=req.params;
        const user = await User.findOneAndDelete({username:username});
        if(!user){
            return res.status(400).json({message:'User does not exist'});
        }
        return res.status(201).send({ message:'User deleted'});
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

const approveUser = async (req,res,next) => {
    try{
        const {username}=req.params;
        const user = await User.findOneAndUpdate({username:username,role:'Manager'},{approved:true});
        if(!user){
            return res.status(400).json({message:'User does not exist or is not a manager'});
        }
        return res.status(201).send({ message:'User approved'});
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

const updateUser = async (req,res,next) => {
    try{
        const {username}=req.params;
        const {firstName,lastName,password,role,birthdate,nationality,gender,creditCardNumber}= req.body;
        const user = await User.updateOne({username:username},{$set:{firstName:firstName,lastName:lastName,password:password,
            role:role,birthdate:birthdate,nationality:nationality,gender:gender,creditCardNumber:creditCardNumber}});
        if(user.matchedCount==0){
            return res.status(400).json({message:'User does not exist'});
        }
        return res.status(201).send({ message:'User updated'});
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

const reserve = async (req,res,next) => {
    try{
        const {username,match_id}=req.params;
        const {seatNumber,creditCardNumber,creditPinNumber}= req.body;
        const user = await User.find({username:username});
        if(!user){
            return res.status(400).json({message:'User does not exist'});
        }
        const match = await Match.findById(match_id);
        if(!match){
            return res.status(400).json({message:'Match does not exist'});
        }
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.checkUsername = checkUsername;
exports.getAllUsers = getAllUsers;
exports.getNonApprovedUsers = getNonApprovedUsers;
exports.deleteUser = deleteUser;
exports.approveUser = approveUser;
exports.updateUser = updateUser;
exports.reserve = reserve;
