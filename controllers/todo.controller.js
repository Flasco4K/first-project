const Todo = require("../models/todo");

//-Tüm Todoları Getirir ve Filtreler
exports.getTodos = async (req, res, next) => {
    try {
        const { status } = req.query;

        if (!status || status === "all") {
            return res.status(200).json(todos);
        }

        const filterTodos = todos.filter(t => t.status === status);
        return res.status(200).json(filterTodos);
    } catch (err) {
        next(err); // Hata olursa errorHandler'a gönderir
    }
};

//-Todo’nun durumunu Değiştiren Endpoint
exports.putToggle = (req, res, next) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        const err = new Error("Todo Bulunamadı");
        err.status(404);
        return next(err);
    }
    else if (todo.status === "tamamlanmis") {
        todo.status = "tamamlanmamis";
    } else {
        todo.status = "tamamlanmis";
    }
    return res.status(200).json(todo)
}

//-Todo’ları başlığına göre arayabilmek
exports.getSearch = (req, res, next) => {
    const q = req.query.q;

    if (!q) {
        const err = new Error("Arama kelimesi zorunlu");
        err.status = 400;
        return next(err);
    }
    const todo = todos.filter(t => t.title === q);
    return res.status(200).json(todo);
};

//-En Son eklenen 3 todoyu görmek Slice() ile
exports.getLast = (req, res) => {
    const count = todos.length;
    if (count <= 3) {
        res.status(200).json(todos);
    } else {
        const lastTodos = todos.slice(-3)
        res.status(200).json(lastTodos);
    }
}
// -Todo Sayısı
exports.getCount = (req, res) => {
    const count = todos.length;
    res.status(200).json({ count: count });

};

//-Tek Todo Getiren Endpoit
exports.getTodoById = (req, res, next) => {
    const id = req.params.id;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        const err = new Error("Todo Getirilemedi");
        err.status = 404;
        return next(err);
    }

    res.status(200).json(todo);
};

//-Todo’nun sadece başlığını getir
exports.getTitle = (req, res, next) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        const err = new Error("Baslik Bulunamadi");
        err.status = 404;
        return next(err);
    }
    return res.status(200).json({ title: todo.title });
};

//-Yeni Todo Ekle
exports.getCreateTodo = async (req, res, next) => {
    try {
        const { title } = req.body;

        if (!title) {
            const err = new Error("Title Girmek Zorunlu");
            err.status = 400; // Genelde eksik veri 400'dür
            return next(err);
        }

        // Yeni bir doküman oluşturuyoruz
        const newTodo = new Todo({
            title,
            status: "tamamlanmamis"
            // createdAt ve id otomatik oluşacak
        });

        const savedTodo = await newTodo.save(); // DB'ye kaydet
        res.status(201).json(savedTodo);
    } catch (err) {
        next(err);
    }
};

//-Update Todo
exports.putTodo = (req, res, next) => {
    const { id } = req.params;
    const { title, status } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        const err = new Error("Todo Güncellenemedi");
        err.status = 404;
        return next(err)
    };

    // Eğer title gönderildiyse todo'nun title alanını günceller
    if (title !== undefined) todo.title = title;

    // Eğer status gönderildiyse todo'nun status alanını günceller
    if (status !== undefined) todo.status = status;

    res.status(200).json(todo);
};

//-Delete Todo
exports.deleteTodo = (req, res, next) => {
    const { id } = req.params;

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        const err = new Error("Todo Bulunamadı");
        err.status = 404
        return next(err);
    }
    todos.splice(index, 1);
    res.status(204).send();
};

