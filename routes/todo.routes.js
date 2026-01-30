const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

// Middlewares
const auth = require("../middlewares/authMiddleware");
const logger = require("../middlewares/logger");
const validation = require("../middlewares/validation");
const throttle = require("../middlewares/throttle");

router.use(logger);


router.use(auth);

router.get("/count", todoController.getCount);
router.get("/search", todoController.getSearch);
router.get("/last", todoController.getLast);

router.get("/", throttle, todoController.getTodos);
router.post("/", validation, todoController.getCreateTodo);

router.get("/:id/title", todoController.getTitle);
router.get("/:id", todoController.getTodoById);

router.put("/:id/toggle", todoController.putToggle);
router.put("/:id", validation, todoController.putTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;