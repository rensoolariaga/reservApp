const { Router } = require('express');
const router = Router();

// importo las funciones de los controladores 

const {

    postPayment,
    getPayment
} = require('../controllers/paymentController.js')

// le asigno las funciones a una ruta 
router.post("/", postPayment);

router.get("/", getPayment);

module.exports = router;