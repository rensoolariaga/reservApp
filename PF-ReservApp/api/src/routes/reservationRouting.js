const { Router } = require("express");
const router = Router();

// importo las funciones de los controladores

const {
    postReservation,
    getReservation,
    deleteReservation,
    updateReservation
} = require("../controllers/reservationController.js");

// le asigno las funciones a una ruta
router.post("/", postReservation);
router.get("/", getReservation);
router.delete('/delete', deleteReservation);
router.put('/update', updateReservation)

module.exports = router;