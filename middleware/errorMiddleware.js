const errorMiddleware = (error, req, res, next) => {
    console.log(error.message);
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server error." })
}

module.exports = errorMiddleware;