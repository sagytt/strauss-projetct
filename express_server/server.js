const express = require("express");
const db = require("./src/db/database");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const app = express();

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const authRoutes = require('./routes/auth');
const candidatesRoutes = require('./routes/candidates');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", candidatesRoutes);