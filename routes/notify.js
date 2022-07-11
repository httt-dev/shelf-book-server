const express = require('express')
const routerNotify = express.Router();

routerNotify.post("/", async function (req, res) {
    try {
        console.log("call notify api");
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json("OK");
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = routerNotify;