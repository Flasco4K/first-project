const todoService = require("../services/todo.service");

//-Tüm Todoları Getirir ve Filtreler
exports.getTodos = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const todos = await todoService.getTodos(userId)

        return res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};

//-Todo’nun durumunu Değiştiren Endpoint
exports.putToggle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updatedTodo = await todoService.putToggle(id, userId)
        res.status(200).json({
            message: "Durum Başarıyla Güncellendi",
            todo: updatedTodo
        });
    } catch (err) {
        next(err);
    }
};

//-Todo’ları başlığına göre arayabilmek
exports.getSearch = async (req, res, next) => {
    try {
        const searchTerm = req.query.title;
        const userId = req.user.id;

        const todos = await todoService.getSearch(userId, searchTerm)
        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};

//-En Son eklenen 3 todoyu görmek Slice() ile
exports.getLast = async (req, res, next) => {
    try {
        const lastTodos = await todoService.getLast(req.user.id);
        res.status(200).json(lastTodos);
    } catch (err) {
        next(err);
    }
};

// -Todo Sayısı
exports.getCount = async (req, res, next) => {
    try {
        const count = await todoService.getCount(req.user.id);
        res.status(200).json({ count });
    } catch (err) {
        next(err);
    }
};

//-Tek Todo Getiren Endpoit
exports.getTodoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const todo = await todoService.getTodoById(id, userId);
        return res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
};

//-Todo’nun sadece başlığını getir
exports.getTitle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todoTitle = await todoService.getTitle(id, req.user.id);
        res.status(200).json(todoTitle);
    } catch (err) {
        next(err);
    }
};

//-Yeni Todo Ekle
exports.getCreateTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        const newTodo = await todoService.createdTodo({ title, description, userId });

        res.status(201).json({ message: "Todo Eklendi", todo: newTodo });
    } catch (err) {
        next(err);
    }
};

//-Update Todo
exports.putTodo = async (req, res, next) => {
    try {
        const { id } = req.params;    // URL'den Todo ID
        const userId = req.user.id;   // Token'dan User ID (Güvenlik!)
        const todoData = req.body;   // Body'den Yeni Veriler (title, description)

        const updatedTodo = await todoService.putTodo(id, userId, todoData);

        res.status(200).json({ message: "Güncelleme başarılı kanka", todo: updatedTodo });
    } catch (err) {
        next(err);
    }
};

//-Delete Todo
exports.deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await todoService.deleteTodo(id, userId)

        res.status(200).json({ message: "Todo Başarıyla Silindi" });
    } catch (err) {
        next(err);
    }
};

