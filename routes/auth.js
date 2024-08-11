const express = require("express");
const router = express.Router();
const signUp = require("../controllers/authController/signUp");
const errorMiddleware = require("../middleware/errorMiddleware");

router.post('/signUp', signUp, errorMiddleware);

module.exports = router;