module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        // if token is not present, allow user to share opinion
        next();
    } else {
        // if token is present, don't allow user to share opinion again
        res.status(401).json({msg: 'You have already submitted your response'});
    }
};