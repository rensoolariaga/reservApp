const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const complex = require("./complexRouting.js");
const field = require("./fieldRouting.js");
const fieldtype = require("./fieldTypeRouting.js");
const firebase = require("./firebaseRouting.js");
const privileges = require("./privilegesRouting.js");
const reservation = require("./reservationRouting.js")
const user = require("./userRouting.js");
const mercadoPago = require("./pruebaRouting.js")
const succesMail = require("./succesMailRouting.js")
const failMail = require("./failMailRouting.js")
const session = require("./sessionRouting.js")
const session1 = require("./sessionRouting1.js");
const updatePassword = require("./upadatePasswordRouting.js")
const reviews = require("./reviewsRouting")
const activeSessionGoogle = require("./activeSessionGoogleRouting")
const userMessage = require("./userMessageRouting");

const router = Router();

// Configuración del routeado

router.use("/auth", firebase);
router.use("/complex", complex);
router.use("/field", field);
router.use("/fieldtype", fieldtype);
router.use("/privileges", privileges);
router.use("/reservation", reservation);
router.use("/user", user);
router.use("/mercadoPagoPost", mercadoPago)
router.use("/succesMail", succesMail)
router.use("/failMail", failMail)
router.use("/session", session)
router.use("/session1", session1)
router.use("/updatePassword", updatePassword)
router.use("/reviews", reviews)
router.use("/activeSessionGoogle", activeSessionGoogle)
router.use("/userMessage", userMessage)
module.exports = router;