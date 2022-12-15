const User = require('../models/userSchema');
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
            return res.status(400).json({message:'Username does not exist'});
        }
        return res.status(201).send({ message:'Username exists'});
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.checkUsername = checkUsername;
