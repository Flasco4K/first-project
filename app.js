const express = require("express");
const bodyParser = require("body-parser");

const todoRoutes = require("./routes/todo.routes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todos", todoRoutes); 

app.use(errorHandler); // 3️⃣ ❗ EN SON

app.listen(3000, () => {
  console.log("Server çalışıyor");
});
