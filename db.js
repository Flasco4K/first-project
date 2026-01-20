// Todo listesini tutan dizi
// Şu an veriler RAM'de tutuluyor (veritabanı yok)
let todos = [{
    id: "1", //Todo'nun benzersiz ID'si
    title: "emirhan ilk gorev", // Todo başlığı
    status: "tamamlanmamis", // Todo durumu
    createdAt: new Date() // Todo Oluşturulma tarihi
}];

module.exports = {todos}