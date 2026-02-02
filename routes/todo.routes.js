const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const authMiddleware = require("../middlewares/authMiddleware"); 

router.use(authMiddleware);

// Parametresiz rotalar üste (Çakışma olmasın diye)
router.get("/last", todoController.getLast);
router.get("/count", todoController.getCount);
router.get("/search", todoController.getSearch);

// Standart CRUD
router.get("/", todoController.getTodos);
router.post("/", todoController.getCreateTodo);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.putTodo);
router.patch("/toggle/:id", todoController.putToggle);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;