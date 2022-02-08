const { token2 } = require("./sessionController.js");

async function activeSessionGoogle(req, res) {

    if (token2.mail) {
        return res.json({
            result: "succes login with google",
            data: "Usuario ya existente en la base de datos",
            login: true
        });
    } else {
        return res.json({
            result: "success",
            data: "La sesión iniciada con google ha sido cerrada",
            login: false,
        });
    }

}

module.exports = {
    activeSessionGoogle,
};