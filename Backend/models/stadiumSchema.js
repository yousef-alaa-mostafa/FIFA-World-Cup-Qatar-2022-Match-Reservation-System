const mongoose=require('mongoose');


const stadiumSchema = new mongoose.Schema ({
    //array of vacant seats (indices)
    // array of reserved seats (indices)
    image : {type: String},
    name: {type :String ,required :true,trim: true,unique: true},
    location: {type :String ,required :true,trim: true},
    capacity: {type: Number,required :true},
    reservedSeats: [{type: Number}],
    
},{timestamps: true});


const Stadium= mongoose.model('Stadiums',stadiumSchema);
module.exports = Stadium;