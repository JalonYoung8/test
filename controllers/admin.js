const Joi = require("joi");
const User = require("../models/User");
const Movie = require("../models/Movie");
const Review = require("../models/Review");

const methods = {
  // Add a new Movie

  async addMovie(req, res, next) {
    let newReview;
    let newMovie;
    try {
      const { title, release_year, cast, duration, rating, review } = req.body;

      const schema = Joi.object().keys({
        title: Joi.string().required(),
        release_year: Joi.string().required(),
        cast: Joi.string().required(),
        duration: Joi.string().required(),
        rating: Joi.string().required(),
        review: Joi.object()
          .allow("")
          .keys({
            comment: Joi.string().allow(""),
            rating: Joi.string().allow(""),
          }),
      });

      const results = schema.validate(req.body);
      if (results.error) {
        return res.status(400).send(results.error.details[0].message);
      }

      newMovie = new Movie({
        title,
        release_year,
        cast,
        duration,
        rating,
      });
      await newMovie.save();

      if (review.comment != "" && review.rating != "") {
        newReview = new Review({
          review: review.comment,
          username: req.user.username,
          movie_id: newMovie._id,
          rating: review.rating,
          createdAt: Date.now(),
        });
        await newReview.save();
      }
      res.status(200).json({ message: "Success!", newMovie, newReview });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = methods;

// Get token from Model create cookie and send response
const Helpers = {};
