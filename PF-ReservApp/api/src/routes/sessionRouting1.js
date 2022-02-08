const { Router } = require("express");
const router = Router();
const {
    session1,
} = require("../controllers/sessionController1");

router.post("/", session1);
//router.get("/info", getUserInfo);
//router.options("/", optionsUser);

module.exports = router;