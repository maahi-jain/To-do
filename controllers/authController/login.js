const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (!user) {
            let error = new Error("Username or password is wrong.");
            error.statusCode = 401;
            throw error;
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token });

    } catch (error) {
        next(error);
    }
}

module.exports = login;