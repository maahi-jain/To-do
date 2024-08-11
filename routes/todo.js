const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const error = require("../middleware/errorMiddleware");
const createTodo = require("../controllers/todoController/createTodo");
const getAllTodos = require("../controllers/todoController/getAllTodos");
const getTodoById = require("../controllers/todoController/getTodoById");
const updateTodo = require("../controllers/todoController/updateTodo");
const deleteTodo = require("../controllers/todoController/deleteTodo");

router.post('/', auth, createTodo, error);
router.get('/', auth, getAllTodos, error);
router.get('/:id', auth, getTodoById, error);
router.put('/:id', auth, updateTodo, error);
router.delete('/:id', auth, deleteTodo, error);

module.exports = router;