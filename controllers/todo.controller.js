const { todos } = require("../db");

//-Tüm Todoları Getirir ve Filtreler
exports.getTodos = (req, res) => {
    const status = req.query.status;

    if (!status) {
        return res.status(200).json(todos);
    }

    const filterTodos = todos.filter(t => t.status === status);
    return res.status(200).json(filterTodos);
};

//-Tamamlanan Todolar
exports.getCompleted = (req, res) => {
    const completedTodos = todos.filter(t => t.status === "tamamlanmis");
    return res.status(200).json(completedTodos);
};

//-Tamamlanmayan Todolar
exports.getPending = (req, res) => {
    const pendingTodos = todos.filter(t => t.status === "tamamlanmamis");
    return res.status(200).json(pendingTodos);
};

//-Todo’nun durumunu Değiştiren Endpoint
exports.putToggle = (req, res) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ message: "Todo Bulunamadi" });

    if (todo.status === "tamamlanmis") {
        todo.status = "tamamlanmamis";
    } else {
        todo.status = "tamamlanmis";
    }
    return res.status(200).json(todo)
}

//-Todo’ları başlığına göre arayabilmek
exports.getSearch = (req, res) => {
    const q = req.query.q;
    if (!q) return res.status(400).json({ message: "Arama Kelimesi Zorunlu" });
    const todo = todos.filter(t => t.title === q);
    return res.status(200).json(todo);
}

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
exports.getTodoById = (req, res) => {
    const id = req.params.id;

    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ message: "Todo Getirilemedi" });
    res.status(200).json(todo);
};

//-Todo’nun sadece başlığını getir
exports.getTitle = (req, res) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(400).json({ message: "Todo Bulunamadi" });
    return res.status(200).json({ title: todo.title});



}

//-Yeni Todo Ekle
exports.getCreateTodo = (req, res) => {

    const { title } = req.body;

    if (!title) {     // Eğer title yoksa hata döner
        return res.status(400).json({ message: "title girmek zorunlu" });
    }
    const newTodo = {  // Yeni todo objesi oluşturulur
        id: Date.now().toString(),   // Şu anki zamanı kullanarak benzersiz ID üretir

        title,
        status: "tamamlanmamis",
        createdAt: new Date()
    };

    todos.push(newTodo); // Yeni todo'yu todos dizisine ekler
    res.status(201).json(newTodo);
};

//-Update Todo
exports.putTodo = (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(400).json({ message: "Todo Bulunamadi" });
    };

    // Eğer title gönderildiyse todo'nun title alanını günceller
    if (title !== undefined) todo.title = title;

    // Eğer status gönderildiyse todo'nun status alanını günceller
    if (status !== undefined) todo.status = status;

    res.status(200).json(todo);
};

//-Delete Todo
exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Todo Bulunamadi" });
    }

    todos.splice(index, 1);
    res.status(204).send();
};

