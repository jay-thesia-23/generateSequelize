const express = require("express");
const combo = require("./router/combo.router");
const app = express();

app.use(express.json());
app.use(combo);

app.listen("6000", () => {
  console.log("app is running on the port 6000");
});
