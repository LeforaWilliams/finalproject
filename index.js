const express = require("express");
// const gui = require("dat.gui");
const app = express();
const compression = require("compression");

app.use(express.static("public"));
app.use(compression());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(8080, () => {
    console.log("listening");
});
