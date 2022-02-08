const { Router } = require("express");
const router = Router();

// importo las funciones de los controladores

const {
    getAllFields,
} = require("../controllers/fieldTypeController.js");

// le asigno las funciones a una ruta

router.get("/", getAllFields);

module.exports = router;