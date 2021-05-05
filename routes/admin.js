const express = require("express");
const router = express.Router();

// Middlewares //
const { protect, authorize } = require("../middleware/auth");

// Controller Functions //
const methods = require("../controllers/admin");

//Register USER routes
router.post("/add-movie", [protect, authorize("admin")], methods.addMovie);

module.exports = router;
