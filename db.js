const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("DB Bağlandı ✅");
    } catch (err) {
        console.log("Bağlantı Hatası ❌:", err);
    }
};
module.exports = conn;