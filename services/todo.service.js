const TodoRepository = require("../repositories/todo.repository");

class todoService {
    async getTodos(userId) {
        if (!userId) {
            throw new Error("Kullacı Kimliği Bulunamadı,Tekrar Giris Yapiniz!")
        }

        const todos = await TodoRepository.getTodos(userId); //Sadece o kullanıcıya ait todoları çek
        return todos;
    };

    async putToggle(id, userId) {
        const todo = await TodoRepository.findTodoById(id);
        if (!todo) {
            throw new Error("Todo Bulunamadı");
        }

        if (todo.userId.toString() !== userId.toString()) {
            throw new Error("Bu Todoyu Güncelleme Yetkin Yok!")
        }

        const updatedTodo = await TodoRepository.update(id, {
            completed: !todo.completed
        });
        return updatedTodo;
    };

    async getSearch(userId, searchTerm) {
        if (!userId) {
            throw new Error("Önce Giris Yapiniz!")
        }

        if (!searchTerm || searchTerm.trim() === "") { //Arama Terimi Boşsa: Tüm todoları çek
            return await TodoRepository.getTodos(userId);
        }

        const results = await TodoRepository.searchByUserId(userId, searchTerm);
        return results;

    };

    async deleteTodo(id, userId) {
        const todo = await TodoRepository.findTodoById(id);

        if (!todo) {
            throw new Error("Todo Bulunamadı");
        }

        if (todo.userId.toString() !== userId.toString()) {
            throw new Error("Bu Todoyu Güncelleme Yetkin Yok!")
        }

        const deletedTodo = await TodoRepository.delete(id);
        return deletedTodo;

    };

    async createdTodo(todoData) {
        if (!todoData.title || todoData.title.trim() === "") {
            throw new Error("Todo Baslığı Boş Olamaz!");
        }
        const newTodo = await TodoRepository.create(todoData)
        return newTodo;
    };

    async putTodo(id, userId, updateData) {
        const todo = await TodoRepository.findTodoById(id);

        if (!todo) {
            throw new Error("Güncellenecek Todo Bulunamadı");
        }

        if (todo.userId.toString() !== userId.toString()) {
            throw new Error("Bu Todoyu Güncelleme Yetkin Yok");
        }

        const updatedTodo = await TodoRepository.update(id, updateData);
        return updatedTodo;

    };

    async getTodoById(id, userId) {
        const todo = await TodoRepository.findTodoById(id);

        if (!todo) {
            throw new Error("Todo Bulunamadı");
        }

        if (todo.userId.toString() !== userId.toString()) {
            throw new Error("Geçersiz Yetki")
        }
        return todo

    };

    async getLast(userId) {
        if (!userId) throw new Error("Kullanıcı ID bulunamadı!");
        return await TodoRepository.getLast(userId);
    };

    async getTitle(id, userId) {
        const todo = await TodoRepository.getTitle(id, userId);
        if (!todo) throw new Error("Başlık bulunamadı veya yetkiniz yok!");
        return todo;
    };

    async getCount(userId) {
        if (!userId) throw new Error("Kullanıcı ID bulunamadı!");
        return await TodoRepository.count(userId); 
    };
}
module.exports = new todoService();