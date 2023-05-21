const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan")

app.use(express.json())
app.use(cors());

app.use(logger('dev'))

const productsController = require("./controllers/productController.js");
app.use("/products", productsController);

app.get(("/"), ( req, res ) => {
    res.send("welcome to the products!")
});

app.get("*", ( req, res ) => {
    res.status(404).json( { error: "Page not found" } )
});

module.exports = app;