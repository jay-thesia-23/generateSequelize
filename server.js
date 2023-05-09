const express = require("express");
const combo = require("./router/combo.router");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(combo);

const port = "7000";

app.listen(port, () => {
  console.log(`app is running on the port ${port}`);
});
