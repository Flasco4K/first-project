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
exports.putToggle = async (req, res, next) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
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
}
//-Todo’ları başlığına göre arayabilmek
exports.getSearch = async (req, res, next) => {
    try {
        const q = req.query.q;

        if (!q) {
            const err = new Error("Arama kelimesi zorunlu");
            err.status = 400;
            return next(err);
        }
        const todos = Todo.find({ title: q });
        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};

//-En Son eklenen 3 todoyu görmek Slice() ile
exports.getLast = async (req, res, next) => {
    try {
        const lastTodos = await Todo.find()
            .sort({ cratedAt: -1 })
            .limit(3);
        res.status(200).json(lastTodos);
    } catch (err) {
        next(err);
    }
};

// -Todo Sayısı
exports.getCount = async (req, res, next) => {
    try {
        const countTodo = await Todo.countDocuments();
        res.status(200).json({ count: countTodo });
    } catch (err) {
        next(err);
    }
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
exports.getTitle = async (req, res, next) => {
    try {

        const id = req.params.id;
        const titleTodo = await Todo.findById({ title: titleTodo });

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
    exports.putTodo = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, status } = req.body;

            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                {
                    title,
                    status
                },
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

            const deletedTodo = await Todo.findByIdAndDelete(id);
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

