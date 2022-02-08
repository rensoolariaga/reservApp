const { Router } = require("express");
const router = Router();
const {
    succesMail,
} = require("../controllers/succesMailController.js");

router.get("/", succesMail);
//router.get("/info", getUserInfo);
//router.options("/", optionsUser);

module.exports = router;