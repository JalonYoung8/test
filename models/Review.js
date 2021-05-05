const mongoose = require("mongoose");

// Review SCHEMA
const ReviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },

  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: false,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
