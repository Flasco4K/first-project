const Todo = require("../models/todo");

class TodoRepository {
  async findByUserId(userId) {
    return Todo.find({ userId }).sort({ createdAt: -1 });
  }

  async findById(id) {
    return Todo.findById(id);
  }

  async findByUserIdAndId(userId, todoId) {
    return Todo.findOne({ _id: todoId, userId });
  }

  async create(todoData) {
    const todo = new Todo(todoData);
    return todo.save();
  }

  async update(id, todoData) {
    return Todo.findByIdAndUpdate(id, todoData, { new: true });
  }

  async delete(id) {
    return Todo.findByIdAndDelete(id);
  }

  async countByUserId(userId) {
    return Todo.countDocuments({ userId });
  }

  async findLastByUserId(userId) {
    return Todo.findOne({ userId }).sort({ createdAt: -1 });
  }

  async searchByUserId(userId, searchTerm) {
    return Todo.find({
      userId,
      title: { $regex: searchTerm, $options: "i" },
    });
  }

  async toggleComplete(id) {
    const todo = await Todo.findById(id);
    if (!todo) return null;
    todo.completed = !todo.completed;
    return todo.save();
  }
}

module.exports = new TodoRepository();
