const Todo = require("../models/todo");

//-Tüm Todoları Getirir ve Filtreler
exports.getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });

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
exports.putToggle = async (req, res, next) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findOne({ _id: id, userId: req.user.id });
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
        await todo.save();
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
};

//-Todo’ları başlığına göre arayabilmek
exports.getSearch = async (req, res, next) => {
    try {
        const q = req.query.q;

        if (!q) {
            const err = new Error("Arama kelimesi zorunlu");
            err.status = 400;
            return next(err);
        }
        const todos = await Todo.find({ title: q, userId: req.user.id });
        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};

//-En Son eklenen 3 todoyu görmek Slice() ile
exports.getLast = async (req, res, next) => {
    try {
        const lastTodos = await Todo.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(3);
        res.status(200).json(lastTodos);
    } catch (err) {
        next(err);
    }
};

// -Todo Sayısı
exports.getCount = async (req, res, next) => {
    try {
        const countTodo = await Todo.countDocuments({ userId: req.user.id });
        res.status(200).json({ count: countTodo, });
    } catch (err) {
        next(err);
    }
};

//-Tek Todo Getiren Endpoit
exports.getTodoById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findOne({ _id: id, userId: req.user.id });
        if (!todo) {
            const err = new Error("Todo Getirilemedi");
            err.status = 404;
            return next(err);
        }
        return res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
};

//-Todo’nun sadece başlığını getir
exports.getTitle = async (req, res, next) => {
    try {
        // 1.findById içine direkt 'id' yazılır.
        // 2. select("title") diyerek sadece başlığı getirmesini söyleriz.
        const id = req.params.id;
        const todo = await Todo.findOne({ _id: id, userId: req.user.id }).select("title");

        if (!todo) {
            const err = new Error("Baslik Bulunamadi");
            err.status = 404;
            return next(err);
        }
        return res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
};

//-Yeni Todo Ekle
exports.getCreateTodo = async (req, res, next) => {
    try {
        const { title } = req.body;

        if (!title) {
            const err = new Error("Title Girmek Zorunlu");
            err.status = 400;
            return next(err);
        }

        // Yeni bir doküman oluşturuyoruz
        const newTodo = new Todo({
            title,
            status: "tamamlanmamis",
            userId: req.user.id

        });

        const savedTodo = await newTodo.save(); // DB'ye kaydet
        res.status(201).json(savedTodo);
    } catch (err) {
        next(err);
    }
};

//-Update Todo
exports.putTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, status } = req.body;

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { title, status },
            { new: true }
        );
        if (!updatedTodo) {
            const err = new Error("Todo Güncellenemedi");
            err.status = 404;
            return next(err)
        };

        res.status(200).send();
    } catch (err) {
        next(err);
    }
};

//-Delete Todo
exports.deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Sadece ID ile değil, sahibiyle beraber arayıp sil
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedTodo) {
            const err = new Error("Todo Bulunamadi,Silme Basarisiz");
            err.status = 404
            return next(err);
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

