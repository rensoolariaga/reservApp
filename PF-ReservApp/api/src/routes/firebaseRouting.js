const { Router } = require('express');
const router = Router();
const { logIn, logOut } = require('../controllers/firebaseController.js')

router.post("/login", logIn);
router.post("/logout", logOut)

module.exports = router;