const User = require('../models/userSchema');
const Match = require('../models/matchSchema');
const Ticket = require('../models/ticketSchema');
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
        //if user is a manager and not approved
        if(user.role=='Manager' && !user.approved){
            return res.status(203).json({message:'Manager not approved'});
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
        const {username ,email}=req.body;
        var user = await User.findOne({
            $or:[{username:username},{email:email}]
        });
        if(!user){
            return res.status(400).json({bool: 'false',message:'User does not exist'});
        }
        return res.status(200).send({ bool: 'true',message:'User exists'});
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
        var {firstName,lastName,password,role,birthdate,nationality,gender,creditCardNumber}= req.body;
        if (firstName == "" || lastName == "" || password == "" || role == "" || birthdate == "" || nationality == "" || gender== "" || creditCardNumber == "")
            return res.status(400).json({message:'empty field sent'});
        //if password changed hash it
        if(password){
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password,salt);
        }
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
        
        if (!username || !match_id || !seatNumber || !creditCardNumber || !creditPinNumber){
            return res.status(400).json({message:'Please fill all fields'});
        }
        //check if the user exists
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(400).json({message:'User does not exist'});
        }
        //check if the match exists
        const match = await Match.findById(match_id);
        if(!match){
            return res.status(400).json({message:'Match does not exist'});
        }
        //check if the seat is already reserved
        reservedSeats = match.reservedSeats;
        for (i=0; i<seatNumber.length; i++){
            if (reservedSeats.includes(seatNumber[i])){
                return res.status(400).json({message:'Seat already reserved'});
            }
            // add the seat to the reserved seats
            reservedSeats.push(seatNumber[i]);
        }
        
        
        //add the match to the user's matches
        matches=user.matches;
        //if the user has already reserved a ticket for this match
        if (!matches.includes(match_id)){
        matches.push(match_id);
        }
        //update the match
        await Match.updateOne({_id:match_id},{$set:{reservedSeats:reservedSeats}});
        //update the user
        await User.updateOne({username:username},{$set:{creditCardNumber:creditCardNumber,matches:matches}});
        // if user has a ticket for this match add the seats to the ticket
        const ticket = await Ticket.findOne({match:match_id,user:user._id});
        console.log(ticket)
        if (ticket){
            seats = ticket.seat;
            for (i=0; i<seatNumber.length; i++){
                seats.push(seatNumber[i]);
            }
            await Ticket.updateOne({match:match_id,user:user._id},{$set:{seat:seats}});
            return res.status(201).send({ message:'Ticket reserved'});
        }else{
            // save the ticket
            const ticket = new Ticket({
                match:match_id,
                seat:seatNumber,
                user:user._id
            });
            await ticket.save();
            return res.status(201).send({ message:'Ticket reserved'});
        }
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};

const getReservations = async (req,res,next) => {
    try{
        const {username,match_id}=req.params;
        if (!username || !match_id){
            return res.status(400).json({message:'Please fill all fields'});
        }
        //check if the user exists
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(400).json({message:'User does not exist'});
        }
        //check if the match exists
        const match = await Match.findById(match_id);
        if(!match){
            return res.status(400).json({message:'Match does not exist'});
        }
        //check if the user has a ticket for this match
        const ticket = await Ticket.findOne({match:match_id,user:user._id});
        if(!ticket){
            return res.status(400).json({message:'User has no ticket for this match'});
        }
        //return the seats
        return res.status(201).send({ seats:ticket.seat});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};

const cancel = async (req,res,next) => {
    try{
        const {username,match_id}=req.params;
        //array of seat numbers
        const {seatNumber}= req.body;
        if (!username || !match_id || !seatNumber){
            return res.status(400).json({message:'error'});
        }
        //check if the user exists
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(400).json({message:'User does not exist'});
        }
        //check if the match exists
        const match = await Match.findById(match_id);
        if(!match){
            return res.status(400).json({message:'Match does not exist'});
        }
        //check if the seats are reserved by same user
        const ticket = await Ticket.findOne({match:match_id,user:user._id});
        if(!ticket){
            return res.status(400).json({message:'Seat is not reserved by this user'});
        }
        //remove the seat from the reserved seats
        reservedSeats = match.reservedSeats;
        //loop through the two arrays and remove the seat
        for (var i = 0; i <= seatNumber.length; i++) {
            if (reservedSeats.includes(seatNumber[i])) {
                reservedSeats.splice(reservedSeats.indexOf(seatNumber[i]),1);
            }
        }
        matches=user.matches; 
        //update the match
        await Match.updateOne({_id:match_id},{$set:{reservedSeats:reservedSeats}});
        //update the user
        await User.updateOne({username:username},{$set:{matches:matches}});
        // remove deleted seat from ticket
        seats = ticket.seat;
        //loop through the array and remove the seat
        for (var i = 0; i <= seatNumber.length; i++) {
            if (seats.includes(seatNumber[i])) {
                seats.splice(seats.indexOf(seatNumber[i]),1);
            }
        }
        //if the ticket is empty, delete it
        if(ticket.seat.length==0){
            await Ticket.deleteOne({_id:ticket._id});
        }
        else{
            await Ticket.updateOne({_id:ticket._id},{$set:{seat:ticket.seat}});
        }
        //if the user has no more tickets for this match, remove the match from the user's matches
        const ticket2 = await Ticket.findOne({match:match_id,user:user._id});
        if(!ticket2){
            matches=user.matches;
            matches.splice(matches.indexOf(match_id),1);
            await User.updateOne({username:username},{$set:{matches:matches}});
        }
        return res.status(201).send({ message:'Ticket(s) cancelled'});
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
exports.getReservations = getReservations;
exports.cancel = cancel;
