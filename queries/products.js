const db = require("../db/dbConfig.js");


const getAllProducts = async () => {
  try {
    const allProducts = await db.any("SELECT * FROM products");
    return allProducts;
  } catch (error) {
    return error;
  }
};

const getProduct = async (id) => {
  try {
      const product = await db.one("SELECT * FROM products WHERE id=$1", id);  
      return product;
  } catch (error) {
      return error;
  }
};

const createProduct = async (product) => {
  try {
      const newProduct = await db.one("INSERT INTO products (name, image, category, manufacturer, cost, rating, inStock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [product.name, product.image, product.category, product.manufacturer, product.cost, product.rating, product.inStock]);
      return newProduct;
  } catch (error) {
      return error;
  };
};

const deleteProduct = async (id) => {

  try {
      const removed = await db.one("DELETE FROM Products WHERE id=$1 RETURNING *", id);
      return removed;
  } catch (error) {
      return error;
  };
};

const updateProduct = async (product, id) => {

  try {
      const updatedProduct = await db.any(
      "UPDATE products SET name=$1, image=$2, category=$3, manufacturer=$4, cost=$5, rating=$6, inStock=$7 WHERE id=$8 RETURNING *",
      [product.name, product.image, product.category, product.manufacturer, product.cost, product.rating, product.instock, id]
      );
      return updatedProduct;
  } catch (error) {
      return error;
  };
};


module.exports = {
  getAllProducts, 
  getProduct, 
  createProduct, 
  deleteProduct, 
  updateProduct
};