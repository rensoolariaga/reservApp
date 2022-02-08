const { Router } = require("express");
const router = Router();
const {
    activeSessionGoogle,
} = require("../controllers/activeSessionGoogleController");

router.get("/", activeSessionGoogle);


module.exports = router;