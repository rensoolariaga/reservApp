const { Router } = require("express");
const router = Router();
const {
  getUserInfo,
  optionsUser,
  postUser,
  putUser,
  deleteUser,
  getAllUsers,
  getByID
} = require("../controllers/userController.js");

router.post("/", postUser);
router.get("/info", getUserInfo);
router.put("/", putUser);
router.delete("/", deleteUser);
router.get("/", getAllUsers);
router.get("/id", getByID);
//router.options("/", optionsUser);

module.exports = router;