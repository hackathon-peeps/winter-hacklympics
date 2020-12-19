const express = require("express");
const app = new express();
path = require("path");
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});



app.get("/login/google", (req, res) => {});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
