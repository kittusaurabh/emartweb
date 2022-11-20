const express = require("express");
const router = express.Router();
const auth = require("../../common/middelware");
const customerController = require("./customerController");

router.post("/signup", customerController.signup);
router.post("/login", customerController.login);
router.post("/update", auth.userVerifyToken, customerController.update);
router.post("/logout", auth.userVerifyToken, customerController.logout);
router.post(
  "/forgetpassword",
  auth.userVerifyToken,
  customerController.forgetpassword
);
router.post(
  "/changePassword",
  auth.userVerifyToken,
  customerController.changePassword
);

router.post("/addAddress", auth.userVerifyToken, customerController.addAddress);
router.post(
  "/updateAddress",
  auth.userVerifyToken,
  customerController.updateAddress
);
router.get("/getAddress", auth.userVerifyToken, customerController.getAddress);
router.post(
  "/removeAddress",
  auth.userVerifyToken,
  customerController.removeAddress
);
// router.get(
//   "/getAddressList",
//   auth.userVerifyToken,
//   customerController.getAddressList
// );
router.get(
  "/filterProducts",
  auth.userVerifyToken,
  customerController.filterProducts
);
router.post(
  "/seller/add_item_to_cart",
  auth.userVerifyToken,
  customerController.add_item_to_cart
);
router.post(
  "/seller/increase_quantity",
  auth.userVerifyToken,
  customerController.increaseQuantity
);
router.post(
  "/seller/decrease_quantity",
  auth.userVerifyToken,
  customerController.decreaseQuantity
);
router.post(
  "/seller/remove_item_from_cart",
  auth.userVerifyToken,
  customerController.removeItemFromCart
);
router.get(
  "/seller/get_cart",
  auth.userVerifyToken,
  customerController.getCart
);
router.post(
  "/seller/placeOrder",
  auth.userVerifyToken,
  customerController.placeOrder
);
router.get(
  "/seller/getMyOrders",
  auth.userVerifyToken,
  customerController.getMyOrders
);

router.post(
  "/product/ratingProducts",
  auth.userVerifyToken,
  customerController.ratingProduct
);

router.get(
  "/product/getRatingProducts",
  auth.userVerifyToken,
  customerController.getRatingProduct
);

router.post(
  "/product/addWishlist",
  auth.userVerifyToken,
  customerController.addWishlist
);
router.get(
  "/product/getWishlist",
  auth.userVerifyToken,
  customerController.getWishlist
);
router.post(
  "/product/removeWishlist",
  auth.userVerifyToken,
  customerController.removeWishlist
);

router.post(
  "/addMoneyToWallet",
  auth.userVerifyToken,
  customerController.addMoneyToWallet
);

router.post(
  "/addBankDetails",
  auth.userVerifyToken,
  customerController.addBankDetails
);

router.get(
  "/getBankDetails",
  auth.userVerifyToken,
  customerController.getBankDetails
);

router.post(
  "/updateBankDetails",
  auth.userVerifyToken,
  customerController.updateBankDetails
);

router.post(
  "/deleteBankDetails",
  auth.userVerifyToken,
  customerController.deleteBankDetails
);

exports.Router = router;
