const mongoose=require('mongoose');


const matchSchema = new mongoose.Schema ({
    staduim: { type :String ,trim: true, required: true},
    team1: {type :String ,required :true,trim: true},
    team2: {type :String ,required :true,trim: true},
    date: { type :Date ,required :true,trim: true},
    time: {type: String,required :true},
    price: {type: Number,required :true},
    referee: {type: String,required :true},
    lineman1: {type: String,required :true},
    lineman2: {type: String,required :true},
    
},{timestamps: true});


const Match= mongoose.model('Match',matchSchema);
module.exports = Match;