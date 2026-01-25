const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

//Middlewares
const auth = require("../middlewares/auth");
const logger = require("../middlewares/logger");
const validation = require("../middlewares/validation");
const throttle = require("../middlewares/throttle");

router.use(logger);

router.get("/count", todoController.getCount);
router.get("/search", todoController.getSearch);
router.get("/last", todoController.getLast);

router.get("/", auth, throttle, todoController.getTodos);
router.post("/", auth, validation, todoController.getCreateTodo);

router.get("/:id/title", todoController.getTitle);
router.get("/:id", todoController.getTodoById);

router.put("/:id/toggle", todoController.putToggle);
router.put("/:id", auth, validation, todoController.putTodo);
router.delete("/:id", auth, todoController.deleteTodo);

module.exports = router;
