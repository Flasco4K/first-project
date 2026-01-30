const mongoose = require("mongoose");

// Veritabanına ne kaydedeceğimizi burada tarif ediyoruz
const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB'deki özel ID türü
    ref: "User", // Hangi modele bağlı olduğunu belirttik
    required: true
  },
  title: {
    type: String,
    required: true, // Başlık olmadan kayıt yapılamaz
    trim: true      // Başındaki sonundaki boşlukları siler
  },
  completed: {
    type: Boolean,
    default: false  // Yeni eklenen todo varsayılan olarak yapılmadı sayılır
  },
  date: {
    type: Date,
    default: Date.now // Kayıt anındaki tarihi otomatik atar
  }
});


// Bu şemayı "Todo" adıyla bir modele dönüştürüp dışa aktarıyoruz
module.exports = mongoose.model("Todo", todoSchema);