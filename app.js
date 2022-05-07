const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();

dotenv.config({ path: `./config.env` });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST"],
    credentials: true
}))


app.use(cookieParser());
require("./db/conn")
app.use(express.json());
app.use(require('./router/routers'));

// Step -2 
const PORT = process.env.PORT || 3080;

// Step -3
if (process.env.NODE_ENV === "production") {
    const path = require('path');

    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname,'client','build')));
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT, console.log("Server is running...."));