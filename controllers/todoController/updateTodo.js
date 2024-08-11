const Todo = require("../../models/todo");

const updateTodo = async (req, res, next) => {
    try {
        const user = req.user.id;
        const TodoId = req.params.id;
        const { title, description, state } = req.body;
        console.log("User id--", user);
        console.log("Todo Id--", TodoId);
        const todo = await Todo.findOne({ user, _id: TodoId });

        if (!todo) {
            res.status(404).json({ message: "Todo not found." })
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.state = state || todo.state;

        await todo.save();
        res.status(200).json({ todo, message: "Todo updated successfully." })

    } catch (error) {
        next(error);
    }
}

module.exports = updateTodo;