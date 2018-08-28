"use strict";

const express = require('express');
const app = express();
const path = require("path");
const logger = require("./logger");
const cors = require('cors');
const http = require("http");

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../build')));
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const server = http.createServer(app);
server.listen(port,
    () => logger.info(`CoffeServer is running on ${port}`));

