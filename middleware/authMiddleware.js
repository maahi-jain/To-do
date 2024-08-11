const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ msg: 'Authorization token not found!' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
}

module.exports = auth;