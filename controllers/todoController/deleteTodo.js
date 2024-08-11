const Todo = require("../../models/todo");

const deleteTodo = async (req, res, next) => {
    try {
        const user = req.user.id;
        const TodoId = req.params.id;
        console.log("User id--", user);
        console.log("Todo Id--", TodoId);
        const todo = await Todo.findOneAndDelete({ user, _id: TodoId });

        if (!todo) {
            res.statusCode(404).json({ message: "Todo not found!" })
        }

        res.status(200).json({ todo, message: "To do successfully deleted." })
    } catch (error) {
        next(error);
    }
}

module.exports = deleteTodo;