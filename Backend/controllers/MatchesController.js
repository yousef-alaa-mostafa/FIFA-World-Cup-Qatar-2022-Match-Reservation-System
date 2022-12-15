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
exports.getMatches = getMatches;
exports.addMatch = addMatch;