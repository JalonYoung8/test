const Joi = require("joi");
const User = require("../models/User");

const methods = {
  //REGISTER USER API
  async registerUser(req, res, next) {
    try {
      // Validation for req.body //

      const schema = Joi.object().keys({
        username: Joi.string().max(250).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required(),
        confirm_password: Joi.string().min(5).max(255).required(),
      });

      // Storing Error Responses in Result //
      const results = schema.validate(req.body);
      if (results.error) {
        return res.status(400).send(results.error.details[0].message);
      }

      const { username, email, password, confirm_password } = req.body;

      //// Check If Password and Confirm Password are same or not ////
      if (password !== confirm_password) {
        res.status(403).send("Password and Confirm Password are not same");
      }

      //// Check If user exist with this Email or not ////
      const result = await User.findOne({ username: username });
      if (result) {
        res.status(404).send("User already registered with this username");
      } else {
        // Saving User in DataBase
        const user = await User.create({
          username,
          email,
          password,
        });

        res.status(200).json({ user: user });
      }
    } catch (err) {
      next(err);
    }
  },

  //Login User
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const schema = Joi.object().keys({
        username: Joi.string().max(40).required(),
        password: Joi.string().min(5).max(255).required(),
      });

      const results = schema.validate(req.body);
      if (results.error) {
        return res.status(400).send(results.error.details[0].message);
      }

      //validating email and password
      if (!username || !password) {
        return res.status(400).send("Please provide email and password");
      }

      // check if user exists //
      const user = await User.findOne({ username: username }).select(
        "+password"
      );
      if (!user) {
        return res.status(400).send("You are not registered, Please Sign up!");
      }
      // Check if password matches

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return res.status(400).send("Password is Invalid");
      }
      Helpers.sendTokenResponse(user, 200, res);
    } catch (err) {
      next(err);
    }
  },

  // USER Logout
  async logout(req, res, next) {
    req.session.destroy(() => {
      req.logOut();
      res.clearCookie("token");
      res.status(200).send("Logged out successfully");
    });
  },
};

module.exports = methods;

// Get token from Model create cookie and send response
const Helpers = {
  sendTokenResponse(user, statusCode, res) {
    //create token

    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
    if (user) {
      res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ token: token, user: user });
    } else {
      res.send("Something went wrong");
    }
  },
};
