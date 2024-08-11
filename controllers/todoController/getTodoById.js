const Todo = require("../../models/todo");

const getTodoById = async (req, res, next) => {
    try {
        const user = req.user.id;
        const TodoId = req.params.id;
        console.log("User id--", user);
        console.log("Todo Id--", TodoId);
        const todo = await Todo.findOne({ user, _id: TodoId });
        res.status(200).json({ todo: todo || {} })

    } catch (error) {
        next(error);
    }
}

module.exports = getTodoById;