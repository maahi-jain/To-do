const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = { connectToDB };