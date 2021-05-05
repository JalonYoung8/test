const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// MOVIE SCHEMA
const MovieSchema = new mongoose.Schema({
  show_id: {
    type: String,
    required: false,
  },

  title: {
    type: String,
    required: false,
  },

  type: {
    type: String,
    enum: ["TV Show", "Movie"],
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  cast: {
    type: String,
    required: false,
  },
  release_year: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  listed_in: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  date_added: {
    type: Date,
    default: Date.now,
  },
  avg_rating: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
