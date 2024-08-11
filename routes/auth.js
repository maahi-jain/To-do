const express = require("express");
const router = express.Router();
const signUp = require("../controllers/authController/signUp");
const errorMiddleware = require("../middleware/errorMiddleware");
const login = require("../controllers/authController/login");

router.post('/signUp', signUp, errorMiddleware);
router.post('/login', login, errorMiddleware);

module.exports = router;