const { Router } = require("express");
const router = Router();
const { deleteComplex, getComplexID, getAllComplexes, postComplex, putComplex } = require("../controllers/complexController.js");

router.delete("/", deleteComplex);
router.get("/", getComplexID);
router.get("/all", getAllComplexes);
router.post("/", postComplex);
router.put("/", putComplex);


module.exports = router;