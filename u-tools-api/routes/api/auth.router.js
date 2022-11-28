const Express = require("express");
const router = Express.Router();

const authController = require("../../controllers/auth.controllers");
const runValidations = require("../../validators/index.middleware");
const { registerValidator } = require("../../validators/auth.validators");
const { findUserByIdValidator } = require("../../validators/auth.validators");
const { authentication } = require("../../middlewares/auth.middewares");


router.post("/signup",
  registerValidator,
  runValidations,
  authController.register
);

router.post("/signin", authController.login);

router.get("/:identifier", authentication, findUserByIdValidator, runValidations, authController.FindOneByName);

router.get("/find/:identifier", authentication, findUserByIdValidator, runValidations, authController.FindOneByToken);

router.patch("/patch/:identifier", authentication, authController.UpdateUser);

router.delete("/:_id", authController.deleteUser);

//router.get("/whoami", authentication, authController.whoami);

router.get("/whoami/:identifier", findUserByIdValidator, runValidations, authController.whoami);

router.get("/", authController.findAll);

module.exports = router;