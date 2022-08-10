const jwt = require("jsonwebtoken");
const md5 = require("md5");
const Joi = require("joi");
const adminModel = require("../../model/adminModel");
const User = require("../../model/customerModel");
const Seller = require("../../model/sellerModel");
const Category = require("../../model/category");
const subCategory = require("../../model/subCategory")
const childCategory = require("../../model/childCategory")
const Brands = require("../../model/brandModel")
const Store = require("../../model/store")
const Variant = require("../../model/variantProduct")




exports.login = async function (req, res, next) {
  let {
      email,
      password,
  } = req.body;

  const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
  });

  const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true // remove unknown props
  };

  // validate request body against schema
  const {
      error,
      value
  } = schema.validate(req.body, options);

  if (error) {
      return res.status(400).json({
          message: `Validation error: ${error.details[0].message}`
      });
  }

  let userData = req.body;


  console.log(userData);
  try {
      let users = await adminModel.findOne({
          email: userData.email,
          password: md5(req.body.password)
      });

      console.log("A::::::, ", userData, "llll:::::::::", md5(req.body.password));
      if (!users) {
          return res.status(403).json({
              message: "Incorrect email or password"
          });
      }
      // if(users.isProfileCreated == false){
      //     return res.status(400).json({message: "Please complete your profile before logging in" });
      // }
      var token = jwt.sign({
          email: userData.email
      }, 'supersecret');
      let update = await adminModel.findOneAndUpdate({
          email: userData.email
      }, {
          $set: {
              access_token: token
          }
      }, {
          new: true
      })

      //    delete update._doc.verificationCode
      delete users.password

      return res.status(200).json({
          data: update,
          message: "Successfully logged in"
      });
  } catch (e) {
      return res.status(400).json({
          message: e.message
      });
  }
}
exports.logout = async (req, res) => {
  try {
    let user = await adminModel.findByIdAndUpdate(
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
exports.changepassword = async (req, res) => {
  try {
    let user = await adminModel.findByIdAndUpdate(
      {
        _id: req.body._id
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



exports.isBlocked_user = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(  
      req.body._id,
      {
        is_blocked: req.body.is_blocked,
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
exports.getuser = async (req, res) => {
  try {
   let user = await User.find(req.body)
    
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
exports.deleteuser = async (req, res) => {
  try {
   let user = await User.findByIdAndDelete(req.body._id)
    
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



exports.isBlocked_seller = async (req, res) => {
  try {
    let user = await Seller.findByIdAndUpdate(
      req.body_id,
      {
        is_blocked: req.body.is_blocked,
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
exports.getSeller = async (req, res) => {
  try {
   let user = await Seller.find(req.body)
    
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
exports.deleteSeller = async (req, res) => {
  try {
   let user = await Seller.findByIdAndDelete(req.body._id)
    
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
   let user = await Category.create(req.body)
    
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
   let user = await Category.find(req.body)
    
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
   let user = await Category.findByIdAndUpdate(req.body._id,req.body,{
    new:true
   })
    
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
   let user = await Category.findByIdAndDelete(req.body._id)
    
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
   let user = await subCategory.create(req.body)
    
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
   let user = await subCategory.find(req.body)
    
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
   let user = await subCategory.findByIdAndUpdate(req.body._id,req.body,{
    new:true
   })
    
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
   let user = await subCategory.findByIdAndDelete(req.body._id)
    
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
   let user = await childCategory.create(req.body)
    
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
   let user = await childCategory.find(req.body)
    
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
   let user = await childCategory.findByIdAndUpdate(req.body._id,req.body,{
    new:true
   })
    
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
   let user = await childCategory.findByIdAndDelete(req.body._id)
    
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
   let user = await Brands.create(req.body)
    
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
   let user = await Brands.find(req.body)
    
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
   let user = await Brands.findByIdAndUpdate(req.body._id,req.body,{
    new:true
   })
    
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
   let user = await Brands.findByIdAndDelete(req.body._id)
    
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




exports.addStore = async (req, res) => {
  try {
   let user = await Store.create(req.body)
    
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
exports.getStore = async (req, res) => {
  try {
   let user = await Store.find(req.body)
    
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
exports.updateStore = async (req, res) => {
  try {
   let user = await Store.findByIdAndUpdate(req.body._id,req.body,{
    new:true
   })
    
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
exports.deleteStore = async (req, res) => {
  try {
   let user = await Store.findByIdAndDelete(req.body._id)
    
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




exports.addVariantProduct = async (req, res) => {
  try {
   let user = await Variant.create(req.body)
    
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
exports.getVariantProduct = async (req, res) => {
  try {
   let user = await Variant.find(req.body)
    
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
exports.updateVariantProduct = async (req, res) => {
  try {
   let user = await Variant.findByIdAndUpdate(req.body._id,req.body,{
    new:true
   })
    
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
exports.deleteVariantProduct = async (req, res) => {
  try {
   let user = await Variant.findByIdAndDelete(req.body._id)
    
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
