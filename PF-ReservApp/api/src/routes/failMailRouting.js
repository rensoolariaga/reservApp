const { Router } = require("express");
const router = Router();
const {
    failMail,
} = require("../controllers/failMailController.js");

router.post("/", failMail);
//router.get("/info", getUserInfo);
//router.options("/", optionsUser);

module.exports = router;