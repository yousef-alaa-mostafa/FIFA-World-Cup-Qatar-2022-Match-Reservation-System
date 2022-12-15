const Match = require('../models/matchSchema');

const getMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getMatches = getMatches;