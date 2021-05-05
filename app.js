const express = require("express");
const joi = require("joi");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//cors
app.use(express.json(), cors());

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cookie Parser
app.use(cookieParser());

//sessions
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use("/assets", express.static("assets"));
app.use(express.static(__dirname + "/views"));

//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database has connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const movie = require("./routes/movie");

//Mount Routers
app.use("/api/auth", auth);
app.use("/api/admin", admin);
app.use("/api/movie", movie);

// ---- Error Handler ---- //
app.use((error, req, res, next) => {
  console.log("Main Error =>", error);
  const message = error.message;
  const status = error.status || 500;
  res.status(status).json({ message: message, error: error });
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

if (process.env.NODE_ENV === "production") {
  app.use(function (req, res, next) {
    var protocol = req.get("x-forwarded-proto");
    protocol == "https"
      ? next()
      : res.redirect("https://" + req.hostname + req.url);
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
