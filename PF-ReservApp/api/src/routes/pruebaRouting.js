const { Router } = require("express");
const router = Router();
const {
    mercadoPagoPost,
} = require("../controllers/pruebaController.js");

router.post("/", mercadoPagoPost);
//router.get("/info", getUserInfo);
//router.options("/", optionsUser);

module.exports = router;