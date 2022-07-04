const jwt = require('jsonwebtoken');

module.exports = (res, req, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid User ID.';
        } else {
            next();
        }
    }
catch {(error) => {
    res.status(401).json({
        error: new Error('Invalid request.')
    });
}}
};