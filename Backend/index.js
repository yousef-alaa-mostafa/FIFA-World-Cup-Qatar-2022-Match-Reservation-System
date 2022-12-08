const express = require('express');
const bodyParser = require("body-parser");
const database = require('./database');
const mongoose= require('./database');

const app = express();

var cors = require('cors');
app.use(cors({origin: '*'}));

app.use('/',(req, res)=>{
    res.send("This is the backend server")
})

const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server