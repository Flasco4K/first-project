const TodoRepository = require("../repositories/todo.repository");

class todoService {
    async getTodos(userId) {
        if (!userId) {
            throw new Error("Kullacı Kimliği Bulunamadı,Tekrar Giris Yapiniz!")
        }

        const todos = await TodoRepository.getTodos(userId); //Sadece o kullanıcıya ait todoları çek
        return todos; 
    };

    async putToggle(id,userId){
        const todo = await TodoRepository.findTodoById(id);
        if(!todo) {
            throw new Error("Todo Bulunamadı");
        }

        if(todo.userId.toString() !== userId.toString()){
            throw new Error("Bu Todoyu Güncelleme Yetkin Yok!")
        }

        const updatedTodo = await TodoRepository.update(id,{
            completed: !todo.completed
        });
        return updatedTodo;
    };










};
module.exports = new todoService();