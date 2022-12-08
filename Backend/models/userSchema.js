const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema ({
    username: { type :String ,trim: true, unique: true},
    fisrtName: {type :String ,required :true,trim: true},
    lastName: {type :String ,required :true,trim: true},
    email: { type :String ,required :true,trim: true, unique: true},
    password: {type: String,required :true},
    role:{ type:String ,enum: ['Fan' , 'Admin' ,'Manager'],default:'User',trim: true},
    birthdate:{type: Date},
    nationality: {type: String},
    gender:{type: String},
    matches:[{type: mongoose.Schema.Types.ObjectId ,ref: 'Match' }],
},{timestamps: true});

userSchema.methods.generateJWT = function (){
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    },process.env.JWT_SECRET_KEY ,{expiresIn :'1d'});
    return token;
}
const User= mongoose.model('User',userSchema);
module.exports = User;