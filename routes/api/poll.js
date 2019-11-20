const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserResponse = require('../../models/UserResponse');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route  POST api/poll
// @desc   Poll your opinions
// @access Protected by auth
router.post('/', auth, (req, res) => {
    const reqBodyArray = [...req.body];
    let i, questionNum;
    let filter, update;
    
    for(i = 0; i < reqBodyArray.length; i++) {
        questionNum = i + 1;
        filter = {
            questionNumber: questionNum
        };
        update = {
            $inc: {[reqBodyArray[i]]: 1}
        };
        
        UserResponse.findOneAndUpdate(filter, update, {new: true, upsert: true})
        .then((response) => {
            const payload = {user: 'anonymous'};
            jwt.sign(payload, config.get('jwtSecret'),
                        {expiresIn: 31536000},
                        (error, token) => {
                            if (error) throw error;
                            res.json({token: token,
                                msg: 'Thanks for sharing your opinion.Your opinion has been recorded successfully'});
                        });
        })
        .catch((err) => res.status(500).json({msg: 'Server Error'}));
    }
});

module.exports = router;