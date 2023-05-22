const express = require("express");
const products = express.Router();
const { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct } = require('../queries/products.js');
const { checkProductName } = require("../validations/checkProduct");
const reviewsController = require("./reviewController");


products.use("/:products_id/reviews", reviewsController);

products.get("/", async ( req, res ) => {
    const allProducts = await getAllProducts();
    if(allProducts[0]) {
        res.status(200).json(allProducts);
    } else {
        res.status(500).json({ error: "server error" });
    }
});

products.get('/:id', async (req, res) => {
    const { id } = req.params;
    const products = await getProduct(id);

    if(products) {
        res.json(products);
    } else {
        res.status(404).json({ error: "Sorry! Product was not found" })
    }
});

products.post('/', checkProductName, async (req, res) => {
    const newProduct = req.body;
    try {
        const addedProduct = await createProduct(newProduct);
        res.status(200).json(addedProduct)
    } catch (error) {
        res.status(400).json({ error: error })
    }
});
   
products.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const removed = await deleteProduct(id);
    if(removed) {
        res.status(200).json(removed);
    } else {
        res.status(404).json({ error: "Sorry! Product was not found" });
    }
});

products.put('/:id', checkProductName, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await updateProduct(req.body, id);
        res.status(200).json(updatedProduct);
    } catch (error){
        res.status(400).json({ error: "Sorry! Product could not be updated" });
    }
});




module.exports = products; 