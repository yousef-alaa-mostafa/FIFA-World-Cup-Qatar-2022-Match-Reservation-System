const express = require('express');
const MatchesController = require('../controllers/MatchesController');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await MatchesController.getMatches(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
