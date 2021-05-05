const express = require("express");
const router = express.Router();

// Controller Functions //
const methods = require("../controllers/movie");

//GET all Movies without any filter
router.get("/all-movies", methods.allMovies);

//GET all Movies
router.get("/getAllMovies", methods.getAllMovies);

//GET single movie
router.get("/getSingleMovie/:id", methods.getSingleMovie);

//GET single movie
router.post("/submit-review/:id", methods.addReview);

//Search for a movie
router.get("/search-movie", methods.searchMovie);

module.exports = router;
