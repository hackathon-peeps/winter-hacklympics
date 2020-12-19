const express = require("express");
const app = new express();
path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/login/google", (req, res) => {
    
})

app.listen(8080);
