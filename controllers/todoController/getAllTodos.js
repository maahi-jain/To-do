const Todo = require("../../models/todo");

const getAllTodos = async (req, res, next) => {
    try {
        const user = req.user.id;
        const todos = await Todo.find({ user });
        res.status(200).json({ todos })

    } catch (error) {
        next(error);
    }
}

module.exports = getAllTodos;