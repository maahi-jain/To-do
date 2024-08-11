const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectToDB } = require("./config/db");
dotenv.config();

// Router
const authRouter = require("./routes/auth");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(errorMiddleware);

// DB connection
connectToDB();

// routing
app.use("/api/user", authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));