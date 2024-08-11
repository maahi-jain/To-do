const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        let error = new Error("Invalid credentials.");
        error.statusCode = 401;

        if (!user) {
            throw error;
        }

        console.log("User found.")

        // Match password
        const isMatch = await user.matchPassword(password, user.password);
        console.log("isMatch", isMatch);
        if (!isMatch) {
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