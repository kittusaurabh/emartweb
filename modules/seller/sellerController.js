const Joi = require("joi");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const Seller = require("../../model/sellerModel");
const Gift = require("../../model/gift");
const Category = require("../../model/category");
const subCategory = require("../../model/subCategory");
const childCategory = require("../../model/childCategory");
const Brands = require("../../model/brandModel");
const Product = require("../../model/Product");
const sizeChart = require("../../model/sizeChart");
const utility = require("../../common/utility");
const Bank = require("../../model/bankModel");
const Ticket = require("../../model/ticketModel");

exports.signup = async (req, res) => {
  // Validate request parameters, queries using express-validator
  let {
    name,
    buisness_email,
    mobile_number,
    phone_number,
    country,
    state,
    city,
    profile_picture,
    password,
  } = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    buisness_email: Joi.string().email().required(),
    mobile_number: Joi.string().optional().allow(""),
    phone_number: Joi.string().optional().allow(""),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
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
  userData.buisness_email = userData.buisness_email.toLowerCase();

  userData.password = md5(userData.password);

  var token = jwt.sign(
    {
      buisness_email: userData.buisness_email,
    },
    "supersecret"
  );
  userData.access_token = token;
  try {
    let isExists = await Seller.findOne({
      $or: [
        {
          buisness_email: userData.buisness_email,
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
    var users = await Seller.create(userData);
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
  let { buisness_email, password } = req.body;

  const schema = Joi.object({
    buisness_email: Joi.string().email().required(),
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
    let users = await Seller.findOne({
      buisness_email: userData.buisness_email,
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
        buisness_email: userData.buisness_email,
      },
      "supersecret"
    );
    let update = await Seller.findOneAndUpdate(
      {
        buisness_email: userData.buisness_email,
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
    let user = await Seller.findByIdAndUpdate(req.body._id, req.body, {
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
    let user = await Seller.findByIdAndUpdate(
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
exports.forgetPassword = async (req, res) => {
  try {
    let user = await Seller.findByIdAndUpdate(
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
    let isExists = await Seller.findOne({
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
    let isUpdated = await Seller.findByIdAndUpdate(
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

exports.addGift = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.giftCode ||
      !req.body.amount ||
      !req.body.maxUsageLimit ||
      !req.body.expiryDate
    ) {
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
    let user = await Gift.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getGift = async (req, res) => {
  try {
    let user = await Gift.find(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateGift = async (req, res) => {
  try {
    let user = await Gift.findByIdAndUpdate(req.body._id, req.body, {
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
exports.deleteGift = async (req, res) => {
  try {
    let user = await Gift.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    if (req.body.sheet_url) {
      let file_name = req.body.sheet_url.split("/");
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name);
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await Category.create(sheetJson[i]);
      return res.status(200).json({
        message: "Successful import Category",
      });
    }
    let user = await Category.create(req.body);
    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getCategory = async (req, res) => {
  try {
    let user = await Category.find(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    let user = await Category.findByIdAndUpdate(req.body._id, req.body, {
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
exports.deleteCategory = async (req, res) => {
  try {
    let user = await Category.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    if (req.body.sheet_url) {
      let file_name = req.body.sheet_url.split("/");
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name);
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await subCategory.create(sheetJson[i]);
      return res.status(200).json({
        message: "Successful import Subcategory",
      });
    }
    if (
      !req.body.categoryId ||
      !req.body.subCategory ||
      !req.body.description
    ) {
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
    let user = await subCategory.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getSubCategory = async (req, res) => {
  try {
    let user = await subCategory.find(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateSubCategory = async (req, res) => {
  try {
    let user = await subCategory.findByIdAndUpdate(req.body._id, req.body, {
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
exports.deleteSubCategory = async (req, res) => {
  try {
    let user = await subCategory.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.addChildCategory = async (req, res) => {
  try {
    if (req.body.sheet_url) {
      let file_name = req.body.sheet_url.split("/");
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name);
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await childCategory.create(sheetJson[i]);
      return res.status(200).json({
        message: "Successful import Child Category",
      });
    }
    if (
      !req.body.categoryId ||
      !req.body.subCategoryId ||
      !req.body.childCategory ||
      !req.body.description
    ) {
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
    let user = await childCategory.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getChildCategory = async (req, res) => {
  try {
    let user = await childCategory.find(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateChildCategory = async (req, res) => {
  try {
    let user = await childCategory.findByIdAndUpdate(req.body._id, req.body, {
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
exports.deleteChildCategory = async (req, res) => {
  try {
    let user = await childCategory.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.addBrand = async (req, res) => {
  try {
    if (req.body.sheet_url) {
      let file_name = req.body.sheet_url.split("/");
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name);
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await Brands.create(sheetJson[i]);
      return res.status(200).json({
        message: "Successful import Brands",
      });
    }
    if (!req.body.brandName || !req.body.CategoryId || !req.body.brandLogo) {
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
    let user = await Brands.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getBrand = async (req, res) => {
  try {
    let user = await Brands.find(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateBrand = async (req, res) => {
  try {
    let user = await Brands.findByIdAndUpdate(req.body._id, req.body, {
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
exports.deleteBrand = async (req, res) => {
  try {
    let user = await Brands.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    if (req.body.sheet_url) {
      let file_name = req.body.sheet_url.split("/");
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name);
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await Product.create(sheetJson[i]);
      return res.status(200).json({
        message: "Successful import productes",
      });
    }
    let user = await Product.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getProduct = async (req, res) => {
  try {
    let user = await Product.find(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    let user = await Product.findByIdAndUpdate(req.body._id, req.body, {
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
exports.deleteProduct = async (req, res) => {
  try {
    let user = await Product.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.addSizeChart = async (req, res) => {
  try {
    if (
      !req.body.tamplateName ||
      !req.body.tamplateCode ||
      !req.body.tamplateOption
    ) {
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
    let user = await sizeChart.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getSizeChart = async (req, res) => {
  try {
    let user = await sizeChart.find(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.updateSizeChart = async (req, res) => {
  try {
    let user = await sizeChart.findByIdAndUpdate(req.body._id, req.body, {
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
exports.deleteSizeChart = async (req, res) => {
  try {
    let user = await sizeChart.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.addBankDetails = async (req, res) => {
  try {
    if (
      !req.body.acHolderName ||
      !req.body.bankName ||
      !req.body.accountNumber ||
      !req.body.IFSCSWIFTCode
    ) {
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
    req.body.seller_id = req.userData._id;
    let user = await Bank.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.getBankDetails = async (req, res) => {
  try {
    let user = await Bank.find({
      seller_id: req.userData._id,
    });

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateBankDetails = async (req, res) => {
  try {
    let user = await Bank.findByIdAndUpdate(req.body._id, req.body, {
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

exports.deleteBankDetails = async (req, res) => {
  try {
    let user = await Bank.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      data: user,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.createTicket = async (req, res) => {
  try {
    if (!req.body.issue || !req.body.describeYourIssue) {
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
    req.body.seller_id = req.userData._id;
    let user = await Ticket.create(req.body);

    return res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
