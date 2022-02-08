const { Router } = require('express');
const router = Router();

// importo las funciones de los controladores 

const {

    postReview,
    getReviews
} = require('../controllers/reviewsController.js')

// le asigno las funciones a una ruta 
router.post("/", postReview);
router.get("/", getReviews);

module.exports = router;