const Joi = require("joi");
const User = require("../models/User");
const Movie = require("../models/Movie");
const Review = require("../models/Review");

const methods = {
  // Get All movies without any filter
  async allMovies(req, res, next) {
    try {
      const movies = await Movie.find({}).select("title");
      res.status(200).json({ movies });
    } catch (err) {
      next(err);
    }
  },

  // Get All movies
  async getAllMovies(req, res, next) {
    try {
      const { _skip, _limit } = req.query;
      const movies = await Movie.find()
        .skip(parseInt(_skip))
        .limit(parseInt(_limit))
        .select("title cast rating");

      const filteredArray = movies.map((movie) => {
        if (movie) {
          let cast1, cast2, cast3;
          if (movie.cast) {
            const cast = movie.cast.split(",");
            cast1 = cast[0];
            cast2 = cast[1];
            cast3 = cast[2];
          }
          return {
            _id: movie._id,
            title: movie.title,
            rating: movie.rating,
            cast1: cast1 ? cast1 : "",
            cast2: cast2 ? cast2 : "",
            cast3: cast3 ? cast3 : "",
          };
        }
      });
      res.status(200).json({ filteredArray });
    } catch (err) {
      next(err);
    }
  },

  // Get Single movie
  async getSingleMovie(req, res, next) {
    try {
      const id = req.params.id;
      let filteredMovie;
      let movie = await Movie.findById(id).select(
        "rating title cast release_year duration"
      );

      if (movie) {
        let cast1, cast2, cast3;
        if (movie.cast) {
          const cast = movie.cast.split(",");
          cast1 = cast[0];
          cast2 = cast[1];
          cast3 = cast[2];
        }
        filteredMovie = {
          release_year: movie.release_year,
          duration: movie.duration,
          _id: movie._id,
          title: movie.title,
          rating: movie.rating,
          cast1: cast1 ? cast1 : "",
          cast2: cast2 ? cast2 : "",
          cast3: cast3 ? cast3 : "",
        };
      }

      let reviews = await Review.find({ movie_id: id }).select(
        "review username createdAt rating"
      );
      res.status(200).json({ filteredMovie, reviews });
    } catch (err) {
      next(err);
    }
  },

  // Add a new review
  async addReview(req, res, next) {
    try {
      const { review, username, rating } = req.body;
      const movie_id = req.params.id;

      const newReview = new Review({
        review,
        username,
        movie_id,
        rating,
        createdAt: Date.now(),
      });
      await newReview.save();
      res
        .status(200)
        .json({ message: "Review Submitted successfully", newReview });
    } catch (err) {
      next(err);
    }
  },

  //search movies based on the Tilte
  async searchMovie(req, res, next) {
    try {
      const { title } = req.body;
      const movies = await Movie.find({ title: title }).select("title");
      res.status(200).json({ message: "success!", movies });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = methods;

// Get token from Model create cookie and send response
const Helpers = {};
