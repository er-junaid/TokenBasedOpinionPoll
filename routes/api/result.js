const express = require('express');
const UserResponse = require('../../models/UserResponse');

const router = express.Router();

// @route  GET api/result
// @desc   Show results of polls
// @access Public 
router.get('/', (req, res) => {
    UserResponse.find()
    .then((response) => res.send(response))
    .catch((err) => res.status(500).json({msg: 'Server Error'}));
});

module.exports = router;