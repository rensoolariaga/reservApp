const { Router } = require("express");
const router = Router();

// importo las funciones de los controladores

const {
    postPrivileges,
    getPrivileges,
} = require("../controllers/privilegesController.js");

// le asigno las funciones a una ruta
router.get("/", getPrivileges);
router.post("/", postPrivileges);

module.exports = router;