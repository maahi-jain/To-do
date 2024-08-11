const Todo = require("../../models/todo");

const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            let error = new Error("Data not valid.")
            error.statusCode = 400;
            throw error;
        }

        const user = req.user.id;

        const newTodo = await Todo.create({ title, description, user });
        res.status(201).json({ todo: newTodo.id, message: "Todo created successfully." })

    } catch (error) {
        next(error);
    }
}

module.exports = createTodo;