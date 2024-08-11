const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectToDB } = require("./config/db");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// DB connection
connectToDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));