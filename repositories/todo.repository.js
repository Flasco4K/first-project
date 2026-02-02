const Todo = require("../models/todo");

class TodoRepository {
    async getTodos(userId) { //Userın Bütün Todolarını Getir
        return Todo.find({
            userId
        })
    };

    async findTodoById(id) { //İd İle Todoyu Getirir
        return Todo.findById(id);
    };

    async update(id, todoData) { //Güncelle
        return Todo.findByIdAndUpdate(id, todoData, { new: true });
    };

    async delete(id) { //Sil
        return Todo.findByIdAndDelete(id);
    };

    async create(todoData) { //Ekle
        const newTodo = new Todo(todoData);
        return await newTodo.save();
    };

    async count(userId) { //Sayi
        return Todo.countDocuments({ userId });
    };

    async searchByUserId(userId, searchTerm) { //Başlığa göre arama
        return Todo.find({
            userId,
            title: {
                $regex: searchTerm, // Arama yerine ne yazıldıysa o gelir
                $options: "i" // Büyük küçük harfe duyarsız
            },
        })
    };

    async getLast(userId) {
        return Todo.find({ userId }).sort({ createdAt: -1 }).limit(3);
    };

    async getTitle(id, userId) {
        return Todo.findOne({ _id: id, userId }).select("title");
    };
}

module.exports = new TodoRepository();