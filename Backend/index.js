const express = require('express');
const bodyParser = require("body-parser");
const database = require('./database');
const mongoose= require('./database');
const dotenv = require('dotenv');
dotenv.config();
//routes
const signUpRouter = require('./routes/signUp');

const app = express();

var cors = require('cors');
app.use(cors({origin: '*'}));


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/user/signup',signUpRouter);

console.log("process.env.PORT: "+process.env.PORT)
const port = process.env.PORT || 3000;
const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server