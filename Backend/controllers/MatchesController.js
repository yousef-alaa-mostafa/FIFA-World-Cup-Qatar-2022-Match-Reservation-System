const Match = require('../models/matchSchema');
const Stadium = require('../models/stadiumSchema');

const getMatches = async (req, res) => {
    try {
        const matches = await Match.find().populate('stadium');
        res.status(200).json(matches);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const addMatch = async (req, res) => {
    const { team1, team2, stadium, date, time, lineman1, lineman2 ,referee } = req.body;

    // get the stadium id from the stadium name
    const dbstadium = await Stadium.findOne({ name: stadium }).select({"_id":1});
    if (!dbstadium) {
        return res.status(400).json({ message: 'stadium not found' });
    }
    //check if staduium is available on the same date
    const match1 = await Match.findOne({stadium:dbstadium._id ,date:date ,time:time});
    if (match1) {
        return res.status(400).json({ message: 'stadium is not available' });
    }
    //check if team1 or team2 have match on the same date
    const match2 = await Match.findOne({$or:[{team1:team1 ,date:date},{team2:team2 ,date:date}]});
    if (match2) {
         return res.status(400).json({ message: 'team1 or team2 have match on the same date' });
    }
    //team1 and team2 can't be the same
    if (team1 == team2) {
        return res.status(400).json({ message: 'team1 and team2 can not be the same' });
    }
    const match = new Match({
        team1: team1,
        team2: team2,
        stadium: dbstadium._id,
        date: date,
        time: time,
        lineman1: lineman1,
        lineman2: lineman2,
        referee: referee
    });
    try {
        const newMatch = await match.save();
        res.status(201).json(newMatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const editMatch = async (req, res) => {
    const {id} = req.params;
    const match = await Match.findById(id);
    var { team1, team2, stadium, date, time, lineman1, lineman2 ,referee } = match;
    if (!match) {
        return res.status(400).json({ message: 'match not found' });
    }
    req.body.team1 != null ? team1 = req.body.team1 : team1 = team1;
    req.body.team2 != null ? team2 = req.body.team2 : team2 = team2;
    req.body.date != null ? date = req.body.date : date = date;
    req.body.time != null ? time = req.body.time : time = time;
    req.body.lineman1 != null ? lineman1 = req.body.lineman1 : lineman1 = lineman1;
    req.body.lineman2 != null ? lineman2 = req.body.lineman2 : lineman2 = lineman2;
    req.body.referee != null ? referee = req.body.referee : referee = referee;
    if (req.body.stadium != null){
        const dbstadium = await Stadium.findOne({ name : req.body.stadium }).select({"_id":1});
        if (!dbstadium) {
            return res.status(400).json({ message: 'stadium not found' });
        }
        stadium = dbstadium._id;
        //check if staduium is available on the same date
        const match1 = await Match.findOne({stadium:dbstadium._id ,date:date ,time:time});
        if (match1) {
            if (match1._id != id) {
                return res.status(400).json({ message: 'stadium is not available' });
            }
        }
    }
    else {
        stadium = stadium;
    }
    //team1 and team2 can't be the same
    if (team1 == team2) {
        return res.status(400).json({ message: 'team1 and team2 can not be the same' });
    }
    //check if team1 or team2 have match on the same date except the match that we want to edit
    if (req.body.team1 != null || req.body.team2 != null){
        //check if team1 or team2 have match on the same date except the match that we want to edit
        const match2 = await Match.findOne({$or:[{team1:team1 ,date:date},{team2:team2 ,date:date}]}).select({"_id":1});
        if (match2) {
            if (match2._id != id) {
                return res.status(400).json({ message: 'team1 or team2 have match on the same date' });
            }
        }
    }
    if (req.body.date != null || req.body.time != null){
        //check if staduium is available on the same date
        const match3 = await Match.findOne({stadium:stadium ,date:date ,time:time}).select({"_id":1});
        if (match3) {
            if (match3._id != id) {
            return res.status(400).json({ message: 'stadium is not available' });
            }
        }
    }
            
    try {
        const updatedMatch = await Match.updateOne({ _id: id }, {$set: {team1: team1, team2: team2, 
            stadium: stadium._id, date: date, time: time, lineman1: lineman1, lineman2: lineman2, referee: referee}});
        res.status(200).json(updatedMatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getReservedSeats = async (req, res) => {
    const {match_id} = req.params;
    const match = await Match.findById(match_id);
    if (!match) {
        return res.status(400).json({ message: 'match not found' });
    }
    reservedSeats=match.reservedSeats;
    // create array of boolean to represent the seats
    var seats = new Array(100);
    for (var i = 0; i < 100; i++) {
        if (reservedSeats.includes(i)) {
            seats[i] = 1;
        }
        else {
            seats[i] = 0;
        }
    }
    return res.status(200).json(seats);

};


exports.getMatches = getMatches;
exports.addMatch = addMatch;
exports.editMatch = editMatch;
exports.getReservedSeats = getReservedSeats;