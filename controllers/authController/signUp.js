const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
    try {
        console.log("Inside signup");
        const { username, password } = req.body;
        let user = await User.findOne({ username });

        if (user) {
            const error = new Error("User already exists.");
            error.statusCode = 400;
            throw error;
        }

        user = await User.create({ username, password });
        console.log("User created.")

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        console.log("Token generated");
        res.status(201).json({ token });

    } catch (error) {
        next(error);
    }
}

module.exports = signUp