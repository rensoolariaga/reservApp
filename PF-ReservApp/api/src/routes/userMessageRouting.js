const { Router } = require("express");
const router = Router();
const {
    userMessage,
} = require("../controllers/userMessageController");

router.post("/", userMessage);


module.exports = router;