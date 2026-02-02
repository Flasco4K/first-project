const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db"); // db.js dosyanı çağırdık
const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");

dotenv.config();

const app = express();
connectDB(); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// 8. Sunucuyu Başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend ${PORT} portunda mermi gibi çalışıyor! 🚀`);
});