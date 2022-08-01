const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("./config/config")
require("colors");
const bodyparser = require("body-parser");
const { application } = require("express");
const { request, response } = require("./routes/index");

app.get("/",(request, response) =>{
    response.status(200).json({
        message: "hello Peter"
    })
})
        //express
app.use(bodyparser.urlencoded({extended: false}))
        //express
app.use(bodyparser.json());

app.use("/api",require("./routes/index"));

mongoose.connect(process.env.DB_URL, () => {
    console.log("Connected to Data Base")
})
app.listen(process.env.PORT, () => {
    console.log(`Running in Port ${process.env.PORT.green}`);
});