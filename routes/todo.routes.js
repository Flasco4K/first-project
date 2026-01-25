const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

//Middlewares
const logger = require("../middlewares/logger");
const validation = require("../middlewares/validation");
router.use(logger);

router.get("/count", todoController.getCount);
router.get("/search", todoController.getSearch);
router.get("/last", todoController.getLast);

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);

router.post("/", validation, todoController.getCreateTodo);
router.get("/:id/title", todoController.getTitle);
router.put("/:id/toggle", todoController.putToggle);
router.put("/:id", validation, todoController.putTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
