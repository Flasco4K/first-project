const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server çalışıyor");
});
