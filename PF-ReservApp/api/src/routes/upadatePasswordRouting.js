const { Router } = require("express");
const router = Router();
const {
    updatePasswordG,
} = require("../controllers/updatePasswordController");

router.post("/", updatePasswordG);
//router.get("/info", getUserInfo);
//router.options("/", optionsUser);

module.exports = router;