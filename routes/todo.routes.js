const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

router.get("/count", todoController.getCount);
router.get("/completed", todoController.getCompleted);
router.get("/pending", todoController.getPending);
router.get("/search",todoController.getSearch);

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);

router.post("/", todoController.getCreateTodo);
router.put("/:id/toggle", todoController.putToggle);
router.put("/:id", todoController.putTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
