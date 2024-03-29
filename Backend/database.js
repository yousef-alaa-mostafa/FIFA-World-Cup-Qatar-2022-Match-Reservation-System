const mongoose= require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('strictQuery', false);
class Database{

    constructor(){
        this.connect();
        
    }
    connect(){
        mongoose.connect('mongodb+srv://nouran:'+process.env.DATABASE_PASSWORD+'@cluster0.mg1bc.mongodb.net/MatchReservationSystem?retryWrites=true&w=majority') //this connect method returns a promise
            .then(()=> console.log('Connected to MongoDB'))
            .catch(err => console.error("couldn't connect to MongoDB"))
    }
}
module.exports = new Database();