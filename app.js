const express = require("express");
const { home, newOrder, saveOrder } = require("./controllers");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", home);
app.get("/new-order", newOrder);
app.post("/new-order", saveOrder);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
