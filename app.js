const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.routes");
const errorHandler = require("./middlewares/errorHandler");
const conn = require("./db");
const userRouter = require("./routes/auth.routes");

require("dotenv").config();
conn();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api",userRouter);
app.use("/todos", todoRoutes);

app.use(errorHandler); // 3️⃣ ❗ EN SON

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server çalışıyor");
});
