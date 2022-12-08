const mongoose=require('mongoose');


const staduinSchema = new mongoose.Schema ({
    //array of vacant seats (indices)
    // array of reserved seats (indices)
},{timestamps: true});


const Staduim= mongoose.model('Staduim',staduinSchema);
module.exports = Staduim;