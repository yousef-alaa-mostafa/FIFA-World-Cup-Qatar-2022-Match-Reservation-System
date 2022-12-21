const Stadium = require('../models/stadiumSchema');

const addStadium = async (req, res) => {
    try {
        const { name, location, capacity, image } = req.body;
        var stadium = await Stadium.find({ name: name });
        console.log(stadium);
        if (stadium.length > 0) {
            return res.status(400).json({ message: 'Stadium already exists' });
        }
        stadium = new Stadium({
            name: name,
            location: location,
            capacity: capacity,
            image: image
        });
        await stadium.save();
        res.status(201).json({ message: 'Stadium added successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.addStadium = addStadium;