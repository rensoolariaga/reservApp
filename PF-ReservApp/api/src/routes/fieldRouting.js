const { Router } = require("express");
const router = Router();

// importo las funciones de los controladores

const { deleteField, getField, postField, putField } = require("../controllers/fieldController.js");


// le asigno las funciones a una ruta
router.delete("/", deleteField);
router.get("/", getField);
router.post("/", postField);
router.put("/", putField);

module.exports = router;