const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.routes");
const errorHandler = require("./middlewares/errorHandler");
const conn = require("./db");
const userRouter = require("./routes/auth.routes");

require("dotenv").config();
conn();
const app = express();

app.use(express.static('public')); // Dosyalar dışarı açıldı
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/todos", todoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda hazir!`));