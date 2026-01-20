const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// body-parser middleware'ini kullanarak formdan (x-www-form-urlencoded) gelen verileri okumamızı sağlar
app.use(bodyParser.urlencoded({ extended: true }));

// Todo listesini tutan dizi
// Şu an veriler RAM'de tutuluyor (veritabanı yok)
let todos = [{
    id: "1", //Todo'nun benzersiz ID'si
    title: "emirhan ilk gorev", // Todo başlığı
    status: "tamamlanmamis", // Todo durumu
    createdAt: new Date() // Todo Oluşturulma tarihi
}];

//Tüm Todoları Getirir ve Filtreler
app.get("/todos", (req, res) => {
    const status = req.query.status;

    if (!status) {
        return res.status(200).json(todos);
    }

    const filterTodos = todos.filter(t => t.status === status);
    return res.status(200).json(filterTodos);
})

// POST /todos endpoint'i Yeni bir todo eklemek için kullanılır
app.post("/todos/", (req, res) => {
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
});

// Gelen Todoları Güncelleme (Update işlemi)
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(400).json({ message: "Todo Bulunamadi" });
    };

    if (title !== undefined) todo.title = title;

    // Eğer status gönderildiyse todo'nun status alanını günceller
    if (status !== undefined) todo.status = status;

    res.status(200).json(todo);
});

// Gelen Todoları Silme (Delete İşlemi)
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;

    const todo = todos.find(t => t.id === id); // ID’ye göre todo’yu bul
    if (!todo) {
        return res.status(404).json({ message: "Todo Bulunamadı" });
    };

    todos = todos.filter(t => t.id !== id) //  Todos dizisinden ilgili todo'yu çıkar
    res.status(204).send()

});

//Tek Todo Getiren endpoit
app.get("/todos/:id", (req, res) => {
    const id = req.params.id;

    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ message: "Todo Getirilemedi" });
    res.status(200).json(todo);
});

app.listen(3000, () => {
    console.log("Server çalışıyor");
});
