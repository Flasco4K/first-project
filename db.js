const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("MongoDB mermi gibi bağlandı! 🚀");
    } catch (err) {
        console.error("DB Bağlantı Hatası:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;