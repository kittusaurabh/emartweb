const express = require("express");
const auth = require("../../common/middelware");
const router = express.Router();
const sellerController = require("./sellerController");

router.post("/signup", sellerController.signup);
router.post("/login", sellerController.login);
router.post("/update", auth.sellerVerifyToken, sellerController.update);
router.post("/logout", auth.sellerVerifyToken, sellerController.logout);
router.post(
  "/forgetPassword",
  auth.sellerVerifyToken,
  sellerController.forgetPassword
);
router.post(
  "/changePassword",
  auth.sellerVerifyToken,
  sellerController.changePassword
);

router.post("/addGift", auth.sellerVerifyToken, sellerController.addGift);
router.get("/getGift", auth.sellerVerifyToken, sellerController.getGift);
router.post("/updateGift", auth.sellerVerifyToken, sellerController.updateGift);
router.post("/deleteGift", auth.sellerVerifyToken, sellerController.deleteGift);

router.post(
  "/addCategory",
  auth.sellerVerifyToken,
  sellerController.addCategory
);
router.get(
  "/getCategory",
  auth.sellerVerifyToken,
  sellerController.getCategory
);
router.post(
  "/updateCategory",
  auth.sellerVerifyToken,
  sellerController.updateCategory
);
router.post(
  "/deleteCategory",
  auth.sellerVerifyToken,
  sellerController.deleteCategory
);

router.post(
  "/addSubCategory",
  auth.sellerVerifyToken,
  sellerController.addSubCategory
);
router.get(
  "/getSubCategory",
  auth.sellerVerifyToken,
  sellerController.getSubCategory
);
router.post(
  "/updateSubCategory",
  auth.sellerVerifyToken,
  sellerController.updateSubCategory
);
router.post(
  "/deleteSubCategory",
  auth.sellerVerifyToken,
  sellerController.deleteSubCategory
);

router.post(
  "/addChildCategory",
  auth.sellerVerifyToken,
  sellerController.addChildCategory
);
router.get(
  "/getChildCategory",
  auth.sellerVerifyToken,
  sellerController.getChildCategory
);
router.post(
  "/updateChildCategory",
  auth.sellerVerifyToken,
  sellerController.updateChildCategory
);
router.post(
  "/deleteChildCategory",
  auth.sellerVerifyToken,
  sellerController.deleteChildCategory
);

router.post("/addBrand", auth.sellerVerifyToken, sellerController.addBrand);
router.get("/getBrand", auth.sellerVerifyToken, sellerController.getBrand);
router.post(
  "/updateBrand",
  auth.sellerVerifyToken,
  sellerController.updateBrand
);
router.post(
  "/deleteBrand",
  auth.sellerVerifyToken,
  sellerController.deleteBrand
);

router.post("/addProduct", auth.sellerVerifyToken, sellerController.addProduct);
router.get("/getProduct", auth.sellerVerifyToken, sellerController.getProduct);
router.post(
  "/updateProduct",
  auth.sellerVerifyToken,
  sellerController.updateProduct
);
router.post(
  "/deleteProduct",
  auth.sellerVerifyToken,
  sellerController.deleteProduct
);

router.post(
  "/addSizeChart",
  auth.sellerVerifyToken,
  sellerController.addSizeChart
);
router.get(
  "/getSizeChart",
  auth.sellerVerifyToken,
  sellerController.getSizeChart
);
router.post(
  "/updateSizeChart",
  auth.sellerVerifyToken,
  sellerController.updateSizeChart
);
router.post(
  "/deleteSizeChart",
  auth.sellerVerifyToken,
  sellerController.deleteSizeChart
);

router.post(
  "/addBankDetails",
  auth.sellerVerifyToken,
  sellerController.addBankDetails
);
router.get(
  "/getBankDetails",
  auth.sellerVerifyToken,
  sellerController.getBankDetails
);
router.post(
  "/updateBankDetails",
  auth.sellerVerifyToken,
  sellerController.updateBankDetails
);
router.post(
  "/deleteBankDetails",
  auth.sellerVerifyToken,
  sellerController.deleteBankDetails
);

router.post(
  "/createTicket",
  auth.sellerVerifyToken,
  sellerController.createTicket
);

router.get("/dashboard", auth.sellerVerifyToken, sellerController.dashboard);
router.get("/getOrder", auth.sellerVerifyToken, sellerController.getOrder);

exports.Router = router;
