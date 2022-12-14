const jwt = require("jsonwebtoken");
const md5 = require("md5");
const Joi = require("joi");
const adminModel = require("../../model/adminModel");
const User = require("../../model/customerModel");
const Seller = require("../../model/sellerModel");
const Category = require("../../model/category");
const subCategory = require("../../model/subCategory");
  const childCategory = require("../../model/childCategory");
const Brands = require("../../model/brandModel");
const Store = require("../../model/store");
const Product = require("../../model/Product");
const Return = require("../../model/returnPolicy");
const Coupon = require("../../model/coupon");
const specialOffer = require("../../model/specialOffer");
const Unit = require("../../model/Unit");
const sizeChart = require("../../model/sizeChart");
const Menu = require("../../model/menu");
const footerMenu = require("../../model/footerMenu");
const utility = require("../../common/utility");

         

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
    if (req.body.sheet_url) {
      let file_name = (req.body.sheet_url).split('/')
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name)
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await Category.create(sheetJson[i])
      return res.status(200).json({
        message: "Successful import Category",
      });
    }
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
    console.log(req.file);
    console.log(req.body);
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
    if (req.body.sheet_url) {
      let file_name = (req.body.sheet_url).split('/')
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name)
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await subCategory.create(sheetJson[i])
      return res.status(200).json({
        message: "Successful import Subcategory",
      });
    }
    if(!req.body.categoryId||!req.body.subCategory||!req.body.description){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
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
    if (req.body.sheet_url) {
      let file_name = (req.body.sheet_url).split('/')
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name)
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await childCategory.create(sheetJson[i])
      return res.status(200).json({
        message: "Successful import Child Category",
      });
    }
    if(!req.body.categoryId||!req.body.subCategoryId||!req.body.childCategory||!req.body.description){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
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
    if (req.body.sheet_url) {
      let file_name = (req.body.sheet_url).split('/')
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name)
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await Brands.create(sheetJson[i])
      return res.status(200).json({
        message: "Successful import Brands",
      });
    }
    if(!req.body.brandName||!req.body.CategoryId||!req.body.brandLogo){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
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
  // Validate request parameters, queries using express-validator
  let {
    storeOwner,
    storeName,
    businessEmail,
    mobile,
    storeAddress,
    country,
    state,
    city
  } = req.body;

  const schema = Joi.object({
    storeOwner: Joi.string().required(),
    storeName: Joi.string().required(),
    businessEmail: Joi.string().email().required(),
    mobile: Joi.string().required().allow(""),
    storeAddress: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
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
    let isExists = await Store.findOne({
      $or: [
        {
          businessEmail: userData.businessEmail,
        },
        {
          mobile: userData.mobile,
        },
      ],
    });
    if (isExists) {
      return res.status(400).json({
        message: "Store Already Exists",
      });
    }
    var users = await Store.create(userData);
    return res.status(200).json({
      data: users,
      message: "Successfully Created",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
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



exports.addProduct = async (req, res) => {
  try {
    if (req.body.sheet_url) {
      let file_name = (req.body.sheet_url).split('/')
      file_name = file_name[file_name.length - 1];
      let sheetJson = utility.exel2json(file_name)
      console.log(sheetJson);
      for (let i = 0; i < sheetJson.length; i++)
        await Product.create(sheetJson[i])
      return res.status(200).json({
        message: "Successful import productes",
      });
    }
    let user = await Product.create(req.body)
 
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
   let user = await Product.find(req.body)
    
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
   let user = await Product.findByIdAndUpdate(req.body._id,req.body,{
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
exports.deleteProduct = async (req, res) => {
  try {
   let user = await Product.findByIdAndDelete(req.body._id)
    
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


exports.addCoupon = async (req, res) => {
  try {
    if(!req.body.couponCode||!req.body.discountType||!req.body.amount||!req.body.linkedTo||!req.body.productId||!req.body.maxUsageLimit){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
   let user = await Coupon.create(req.body)
    
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
exports.getCoupon = async (req, res) => {
  try {
   let user = await Coupon.find(req.body)
    
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
exports.updateCoupon = async (req, res) => {
  try {
   let user = await Coupon.findByIdAndUpdate(req.body._id,req.body,{
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
exports.deleteCoupon = async (req, res) => {
  try {
   let user = await Coupon.findByIdAndDelete(req.body._id)
    
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



exports.addReturnPolicy = async (req, res) => {
  try {
    if(!req.body.policyName||!req.body.amount||!req.body.returnDays||!req.body.discription){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
   let user = await Return.create(req.body)
    
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
exports.getReturnPolicy = async (req, res) => {
  try {
   let user = await Return.find(req.body)
    
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
exports.updateReturnPolicy = async (req, res) => {
  try {
   let user = await Return.findByIdAndUpdate(req.body._id,req.body,{
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
exports.deleteReturnPolicy = async (req, res) => {
  try {
   let user = await Return.findByIdAndDelete(req.body._id)
    
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

exports.addUnit = async (req, res) => {
  try {
   let user = await Unit.create(req.body)
    
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

exports.getUnit = async (req, res) => {
  try {
   let user = await Unit.find(req.body)
    
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
exports.updateUnit = async (req, res) => {
  try {
   let user = await Unit.findByIdAndUpdate(req.body._id,req.body,{
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
exports.deleteUnit = async (req, res) => {
  try {
   let user = await Unit.findByIdAndDelete(req.body._id)
    
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



exports.addSpecialOffer = async (req, res) => {
  try {
   let user = await specialOffer.create(req.body)
    
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
exports.getSpecialOffer = async (req, res) => {
  try {
   let user = await specialOffer.find(req.body)
    
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
exports.updateSpecialOffer = async (req, res) => {
  try {
   let user = await specialOffer.findByIdAndUpdate(req.body._id,req.body,{
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
exports.deleteSpecialOffer = async (req, res) => {
  try {
   let user = await specialOffer.findByIdAndDelete(req.body._id)
    
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
    if(!req.body.tamplateName||!req.body.tamplateCode||!req.body.tamplateOption){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
   let user = await sizeChart.create(req.body)
    
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
   let user = await sizeChart.find(req.body)
    
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
   let user = await sizeChart.findByIdAndUpdate(req.body._id,req.body,{
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
exports.deleteSizeChart = async (req, res) => {
  try {
   let user = await sizeChart.findByIdAndDelete(req.body._id)
    
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



exports.addMenu = async (req, res) => {
  try {
    if(!req.body.menuName){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
   let user = await Menu.create(req.body)
    
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
exports.getMenu = async (req, res) => {
  try {
   let user = await Menu.find(req.body)
    
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
exports.updateMenu = async (req, res) => {
  try {
   let user = await Menu.findByIdAndUpdate(req.body._id,req.body,{
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
exports.deleteMenu = async (req, res) => {
  try {
   let user = await Menu.findByIdAndDelete(req.body._id)
    
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

exports.addFooterMenu = async (req, res) => {
  try {
    if(!req.body.menuTitle||!req.body.linkBy||!req.body.widgetPosition){
      return res.status(400).json({
        message: "Keys is Missing",
      });
    }
   let user = await footerMenu.create(req.body)
    
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
exports.getFooterMenu = async (req, res) => {
  try {
   let user = await footerMenu.find(req.body)
    
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
exports.updateFooterMenu = async (req, res) => {
  try {
   let user = await footerMenu.findByIdAndUpdate(req.body._id,req.body,{
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

exports.deleteFooterMenu = async (req, res) => {
  try {
   let user = await footerMenu.findByIdAndDelete(req.body._id)
    
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