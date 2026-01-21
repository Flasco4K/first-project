// Todo listesini tutan dizi
// Şu an veriler RAM'de tutuluyor (veritabanı yok)
let todos = [{
    id: "1", //Todo'nun benzersiz ID'si
    title: "emirhan ilk gorev", // Todo başlığı
    status: "tamamlanmamis", // Todo durumu
    createdAt: new Date() // Todo Oluşturulma tarihi
}];
// function uuidGenerator() { //İd Üret
//     const generatadId = Math.random().toString(36).slice(2) + Date.now().toString(36);
//     return generatadId
// };


module.exports = { todos }