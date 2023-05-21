const express = require("express");
const reviews = express.Router({ mergeParams: true});
const { getAllReviews, getAReview, deleteReview, updateAReview, addAReview } = require("../queries/reviews");


reviews.get("/", async (req, res) => {
  const { products_id } = req.params;
  try {
    const allReviews = await getAllReviews(products_id);
    res.json(allReviews)
  } catch (err) {
    res.json(err)
  }
});

reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getAReview(id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

reviews.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedReview = await updateAReview(id, req.body);
  if (updatedReview.id) {
    res.status(200).json(updatedReview);
  } else {
    res.status(404).json("Review not found");
  }
});

reviews.post("/", async (req, res) => {
  const review = await addAReview(req.body);
  if (review) {
    res.status(200).json(review);
  } else {
    res.status(404).json({ error: "Review not found" });
  }

});

reviews.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedReview = await deleteReview(id);
  if (deletedReview.id) {
    res.status(200).json(deletedReview);
  } else {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = reviews;