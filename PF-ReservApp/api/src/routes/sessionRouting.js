const { Router } = require("express");
const router = Router();
const {
    session,
} = require("../controllers/sessionController");

router.post("/", session);
//router.get("/info", getUserInfo);
//router.options("/", optionsUser);

module.exports = router;