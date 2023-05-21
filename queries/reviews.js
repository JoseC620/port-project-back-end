const db = require("../db/dbConfig");


const getAllReviews = async (products_id) => {
    if(products_id === 'all'){
    try {
        const allReviews = await db.any("SELECT * FROM reviews");
        return allReviews;
        } catch (error) {
         return error;
        }
} else {
    try {
        const allReviews = await db.any("SELECT * FROM reviews WHERE products_id=$1", products_id);
        return allReviews;
      } catch (error) {
        return error;
      }
}
  };
  
const getAReview = async (id) => {
    try {
      const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id);
      return oneReview;
    } catch (error) {
      return error;
    }
  };
  
  
const addAReview = async (review) => {
    const { title, reviewer, content, products_id } = review;
  
    try {
      const newReview = await db.one(
        "INSERT INTO reviews (title, reviewer, content, products_id) VALUES($1, $2, $3, $4) RETURNING *",
        [title, reviewer, content, products_id]
      );
      return newReview;
    } catch (error) {
      return error;
    }
  };
  
const deleteReview = async (id) => {
    try {
      const deletedReview = await db.one(
        "DELETE FROM reviews WHERE id = $1 RETURNING *",
        id
      );
      return deletedReview;
    } catch (error) {
      return error;
    }
  };
  

const updateAReview = async (id, review) => {
    const { title, reviewer, content, products_id } = review;
    try {
      const updatedReview = await db.one(
        "UPDATE reviews SET title = $1, reviewer = $2, content = $3, products_id = $4 WHERE id = $5 RETURNING *",
        [title, reviewer, content, products_id, id]
      );
      return updatedReview;
    } catch (error) {
      return error;
    }
  };
  
  module.exports = {
    getAllReviews,
    getAReview,
    addAReview,
    deleteReview,
    updateAReview,
  };