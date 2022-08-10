const md5 = require("md5");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../../model/customerModel");

exports.signup = async (req, res) => {
  // Validate request parameters, queries using express-validator
  let {
    profile_image,
    user_name,
    user_email,
    mobile_number,
    phone_number,
    city,
    state,
    country,
    user_image,
    password,
  } = req.body;

  const schema = Joi.object({
    user_name: Joi.string().required(),
    user_email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    phone_number: Joi.string().optional().allow(""),
    mobile_number: Joi.string().optional().allow(""),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
    });
  }

  let userData = req.body;
  userData.user_email = userData.user_email.toLowerCase();

  userData.password = md5(userData.password);

  var token = jwt.sign(
    {
      user_email: userData.user_email,
    },
    "supersecret"
  );
  userData.access_token = token;
  try {
    let isExists = await User.findOne({
      $or: [
        {
          user_email: userData.user_email,
        },
        {
          mobile_number: userData.mobile_number,
        },
      ],
    });
    if (isExists) {
      return res.status(400).json({
        message: "Email Or Phone Number Already Exists",
      });
    }
    var users = await User.create(userData);
    return res.status(200).json({
      data: users,
      message: "Successfully Signed Up",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
exports.login = async (req, res) => {
  let { user_email, password } = req.body;

  const schema = Joi.object({
    user_email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
    });
  }

  let userData = req.body;
  try {
    let users = await User.findOne({
      user_email: userData.user_email,
      password: md5(req.body.password),
    });

    if (!users) {
      return res.status(403).json({
        message: "Incorrect email or password",
      });
    }
    // if(users.isProfileCreated == false){
    //     return res.status(400).json({message: "Please complete your profile before logging in" });
    // }
    var token = jwt.sign(
      {
        user_email: userData.user_email,
      },
      "supersecret"
    );
    let update = await User.findOneAndUpdate(
      {
        user_email: userData.user_email,
      },
      {
        $set: {
          access_token: token,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      data: update,
      message: "Successfully logged in",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
exports.update = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    return res.status(200).json({
      data: user,
      message: "Updated",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.body._id,
      {
        access_token: "",
      },
      {
        new: true,
      }
    );
    if (user) {
      return res.status(200).json({
        message: "Successfully Logged Out",
      });
    }
    return res.status(400).json({
      message: "Could Not Logout, Please Try Again",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
exports.forgetpassword = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        password: md5(req.body.password),
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(400).json({
        message: "invalid details",
      });
    }
    return res.status(200).json({
      data: user,
      message: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.changePassword = async (req, res) => {
  try {
    let { old_password, new_password } = req.body;
    if (!old_password) {
      //must
      return res.status(403).json({
        message: "Old password is missing",
      });
    }
    if (!new_password) {
      //must
      return res.status(403).json({
        message: "New password is missing",
      });
    }
    if (old_password == new_password) {
      //should not match
      return res.status(403).json({
        message: "Old and new passwords should not match.",
      });
    }
    let isExists = await User.findOne({
      _id: req.body._id,
    });

    if (!isExists) {
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }
    if (isExists.password != md5(old_password)) {
      return res.status(403).json({
        message: "Please enter correct old password",
      });
    }
    let isUpdated = await User.findByIdAndUpdate(
      req.body._id,
      {
        password: md5(new_password),
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Successfully changed password",
      data: isUpdated,
    });
  } catch (error) {
    res.status(403).json(error.message);
  }
};
