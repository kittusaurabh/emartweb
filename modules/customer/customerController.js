const md5 = require("md5");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../../model/customerModel");
const AddressModel = require("../../model/address");
const cartModel = require("../../model/cartModel");
const sellerModel = require("../../model/sellerModel");
const Product = require("../../model/Product");
const Order = require('../../model/orderModel')
const utility = require("../../common/utility");
 
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
  const {
    error,
    value
  } = schema.validate(req.body, options);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
    });
  }

  let userData = req.body;
  userData.user_email = userData.user_email.toLowerCase();

  userData.password = md5(userData.password);

  var token = jwt.sign({
      user_email: userData.user_email,
    },
    "supersecret"
  );
  userData.access_token = token;
  try {
    let isExists = await User.findOne({
      $or: [{
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
    await cartModel.create({
      user_id: users._id,
    });
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
  let {
    user_email,
    password
  } = req.body;

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
  const {
    error,
    value
  } = schema.validate(req.body, options);

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
    var token = jwt.sign({
        user_email: userData.user_email,
      },
      "supersecret"
    );
    let update = await User.findOneAndUpdate({
      user_email: userData.user_email,
    }, {
      $set: {
        access_token: token,
      },
    }, {
      new: true,
    });

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
      req.body._id, {
        access_token: "",
      }, {
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
    let user = await User.findByIdAndUpdate({
      _id: req.body._id,
    }, {
      password: md5(req.body.password),
    }, {
      new: true,
    });
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
    let {
      old_password,
      new_password
    } = req.body;
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
      req.body._id, {
        password: md5(new_password),
      }, {
        new: true,
      });

    return res.status(200).json({
      message: "Successfully changed password",
      data: isUpdated,
    });
  } catch (error) {
    res.status(403).json(error.message);
  }
};

exports.addAddress = async (req, res) => {
  try {
    let user_id = req.userData._id;
    if (!req.body.address_type)
      return res.status(403).json({
        message: "Key Is Missing",
      });

    console.log("user id::::", user_id);

    let userExist = await AddressModel.findById(user_id).lean(true);
    if (userExist)
      return res.status(400).json({
        message: "address already exist",
      });

    let {
      house_number,
      building_tower,
      pincode,
      location_address,
      address_type,
      address_name,
      lat = 0,
      long = 0,
    } = req.body;

    let location = {
      type: "Point",
      coordinates: [Number(long), Number(lat)],
    };

    let newAdd = await AddressModel.create({
      house_number,
      building_tower,
      pincode,
      address_type,
      lat,
      long,
      address_name,
      location,
      user_id,
      location_address,
    });
    if (!newAdd)
      return res.status(400).json({
        message: "Could Not Create New Address",
      });

    return res.status(200).json({
      message: "Successfully Added New Address.",
      data: newAdd,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    let address_id = req.body.address_id;
    let trustedData = req.body;
    if (trustedData.lat && trustedData.long) {
      trustedData.location = {
        type: "Point",
        coordinates: [Number(trustedData.long), Number(trustedData.lat)],
      };
    }

    let newAdd = await AddressModel.findByIdAndUpdate(address_id, trustedData, {
      new: true,
    });
    if (!newAdd)
      return res.status(400).json({
        message: "Could Not Update Address",
      });

    return res.status(200).json({
      message: "Successfully Updated Address.",
      data: newAdd,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getAddress = async (req, res) => {
  try {
    let user_id = req.userData._id;
    let address_id = req.query.address_id;
    console.log("user id::::", user_id);

    let newAdd = await AddressModel.find(req.body);
    return res.status(200).json({
      message: "Successfully Fetched.",
      data: newAdd,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.removeAddress = async (req, res) => {
  try {
    let user_id = req.userData._id;
    let address_id = req.body.address_id;
    console.log("user id::::", user_id);

    let newAdd = await AddressModel.findOneAndRemove({
      _id: address_id,
    });
    if (!newAdd)
      return res.status(400).json({
        message: "Could Not Remove Address",
      });

    return res.status(200).json({
      message: "Successfull Removed Address.",
      data: newAdd,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};


// exports.getAddressList = async (req, res) => {
//   try {
//     let user_id = req.userData._id;
//     console.log("user id::::", user_id);

//     let newAdd = await AddressModel.find({
//       user_id: user_id,
//     });

//     if (req.query.modules) {
//       modules = req.query.modules;
//       let data = [];
//       let key_name =
//         modules == 0
//           ? "store_radious"
//           : modules == 1
//           ? "seller_radious"
//           : null;
//       let panel =
//         modules == 0
//           ? await branchModel.findById(req.query.panel_id)
//           : modules == 2
//           ? await SellerModel.findById(req.query.panel_id)
//           : null;
//       for (let i = 0; i < newAdd.length; i++) {
//         let distance = commonFunc.distance_of_two_cordinates(
//           newAdd[i].lat,
//           newAdd[i].long,
//           panel.lat,
//           panel.long
//         );
//         console.log(distance, panel[key_name]);
//         if (distance <= panel[key_name]) data.push(newAdd[i]);
//       }
//       if (data.length == 0)
//         return res.status(400).json({
//           message: "Restaurant Not Delivere To Your Address Please Add New One",
//         });
//       newAdd = data;
//     }
//     if (!newAdd)
//       return res.status(400).json({
//         message: "Could Not Fetch Addresses List",
//       });

//     return res.status(200).json({
//       message: "Successfully Fetched.",
//       data: newAdd,
//     });
//   } catch (e) {
//     return res.status(400).json({
//       message: e.message,
//     });
//   }
// };


async function updateGrandTotal(user_id) {
  let cart = await cartModel
    .findOne({
      user_id: user_id,
    })
    .lean(true)
    .populate("items_in_cart.seller_id");

  let items = cart.items_in_cart;
  cart.grand_total_of_cart = 0;
  cart.total_items_in_cart = 0;
  if (items.length > 0) {
    cart.total_items_in_cart = items.length;
    for (var i = 0; i < items.length; i++)
      cart.grand_total_of_cart = cart.grand_total_of_cart + items[i].item_total_price;
  }
  if (items.length == 0) {
    cart.grand_total_of_cart = 0;
    items = [];
    cart.total_items_in_cart = 0;
    cart.seller_id = null;
  }
  await cartModel.findOneAndUpdate({
    user_id: user_id,
  }, {
    grand_total_of_cart: cart.grand_total_of_cart,
    total_items_in_cart: cart.total_items_in_cart,
    items_in_cart: items,
    store_id: cart.store_id,
  }, {
    new: true,
  });
}


exports.add_item_to_cart = async (req, res) => {
  try {
    if (!req.body.selected_quantity) req.body.selected_quantity = 1;
    let cart_item_data = req.body;

    let check_item = await Product.findById(cart_item_data.item_id);

    if (!check_item)
      return res.status(403).json({
        message: "Item Not Found",
      });

    cart_item_data.item_unit_price = check_item.price;
    cart_item_data.item_total_price = check_item.price * Number(cart_item_data.selected_quantity);

    cart_item_data.category_id = check_item.category_id;
    cart_item_data.subCategory_id = check_item.subCategory_id;
    cart_item_data.childCategory_id = check_item.childCategory_id;
    cart_item_data.menu_id = check_item.menu_id;
    cart_item_data.footerMenu_id = check_item.footermenu_id;
    cart_item_data.brand_id = check_item.brand_id;
    cart_item_data.store_id = check_item.store_id;
    cart_item_data.seller_id = check_item.seller_id;

    let is_user_cart_exist = await cartModel.findOne({
      user_id: req.userData._id,
    });
    if (!is_user_cart_exist)
    return res.status(403).json({
      message: "Cart Not Found.",
    });

    let is_item_exist = await cartModel.findOne({
      "items_in_cart.item_id": cart_item_data.item_id
    });
    if (is_item_exist) {
      let quantity = 1
      for (var i = 0; i < is_item_exist.items_in_cart.length; i++) {
        if (
          req.body.item_id.toString() == is_item_exist.items_in_cart[i].item_id.toString()
        ) {
          cart.items_in_cart[i].selected_quantity = cart.items_in_cart[i].selected_quantity + Number(quantity);
          cart.items_in_cart[i].item_total_price = cart.items_in_cart[i].selected_quantity * cart.items_in_cart[i].item_unit_price;
        }
      }
    }
    else {
      let cart = await cartModel.findOneAndUpdate({
        user_id: req.userData._id,
      }, {
        $push: {
          items_in_cart: cart_item_data,
        },
      }, {
        new: true,
      });
      if (!cart)
      return res.status(400).json({
        message: "Cart Could Not Be Updated",
      });
    }
    
    

    let result = await updateGrandTotal(req.userData._id);

    return res.status(200).json({
      message: "Cart Updated Successfully",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.increaseQuantity = async (req, res) => {
  try {
    let cart = await cartModel.findOne({
      user_id: req.userData._id,
    });
    let quantity = req.body.selected_quantity ? req.body.selected_quantity : 1;
    for (var i = 0; i < cart.items_in_cart.length; i++) {
      if (
        req.body.item_id.toString() == cart.items_in_cart[i].item_id.toString()
      ) {
        cart.items_in_cart[i].selected_quantity = cart.items_in_cart[i].selected_quantity + Number(quantity);
        cart.items_in_cart[i].item_total_price = cart.items_in_cart[i].selected_quantity * cart.items_in_cart[i].item_unit_price;
      }
    }
    cart = await cart.save();
    let result = await updateGrandTotal(req.userData._id);

    res.status(200).json({
      message: "Successfully Increased Quantity",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.decreaseQuantity = async (req, res) => {
  try {
    let cart = await cartModel.findOne({
      user_id: req.userData._id,
    });
    let quantity = req.body.selected_quantity ? req.body.selected_quantity : 1;
    for (var i = 0; i < cart.items_in_cart.length; i++) {
      if (
        req.body.item_id.toString() == cart.items_in_cart[i].item_id.toString()

      ) {

        if (cart.items_in_cart[i].selected_quantity == 1) {
          return res.status(400).json({
            message: "Cannot Decrease Quantity, Need To Delete The Item",
          });
        }
        cart.items_in_cart[i].selected_quantity = cart.items_in_cart[i].selected_quantity - Number(quantity);
        cart.items_in_cart[i].item_total_price = cart.items_in_cart[i].selected_quantity * cart.items_in_cart[i].item_unit_price;
      }
    }
    cart = await cart.save();
    let result = await updateGrandTotal(req.userData._id);

    res.status(200).json({
      message: "Successfully Decreased Quantity",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    let cart = await cartModel
      .findOne({user_id: req.userData._id,})
      // .populate("items_in_cart.item_id")
      // .populate("items_in_cart.menu_id")
      // .populate("user_id");

    if (cart.items_in_cart.length == 0) cart = null;

    return res.status(200).json({
      message: "Success.",
      data: cart,
    });
  } catch (error) {
    res.status(403).json(error.message);
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    let cart = await cartModel.findOne({
      user_id: req.userData._id,
    });
    for (var i = 0; i < cart.items_in_cart.length; i++) {
      if (
         req.body.item_id.toString() == cart.items_in_cart[i].item_id.toString()
      ) {
        var is_deleted = cart.items_in_cart.splice(i, 1);
      }
    }
    if (!is_deleted)
      return res.status(400).json({
        message: "Item Not Found In Cart",
      });
    cart = await cart.save();

    let result = await updateGrandTotal(req.userData._id);

    res.status(200).json({
      message: "Successfully Removed From Cart",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    let cart = await cartModel
      .findOne({
        user_id: req.userData._id,
      })
      .lean(true)
      .populate("items_in_cart.seller_id");
    if (!cart)
      return res.status(400).json({
        message: "Cart Not Found.",
      });
    if (!cart.items_in_cart)
      return res.status(400).json({
        message: "Cart Is Empty",
      });
    let randomId = utility.randomString();
    let item_orderd = cart.items_in_cart;

    let order_object = {
      item_orderd: item_orderd,
      user_id: req.userData._id,
      order_id: randomId,
      order_amount: req.body.order_amount,
      tax_amount: req.body.tax_amount,
      discount_amount: req.body.discount_amount,
      shipping_charge: req.body.shipping_charge,
      order_status: "PENDING",
      payment_method: req.body.payment_method,
      address_id: req.body.address_id,
    };

    let order = await Order.create(order_object);

    if (order) {
      let cartUpdated = await cartModel.findOneAndUpdate(
        {
          user_id: req.userData._id,
        },
        {
          total_items_in_cart: 0,
          grand_total_of_cart: 0,
          items_in_cart: [],
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json({
      message: "Successfully Placed Order.",
      data: order,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    let query = {
      user_id: req.userData._id,
    };
    if (req.query.order_id) query._id = req.query.order_id;

    if (req.body.order_status)
      query.order_status = {
        $in: req.body.order_status,
      };

    let order = await Order
      .find(query)
      .sort({
        _id: -1,
      })
      .populate("user_id")
      .populate("address_id")
      .lean(true);
    if (!order)
      return res.status(400).json({
        message: "No Orders found",
      });

    res.status(200).json({
      message: "Successfully Fetched Order's List",
      data: order,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};