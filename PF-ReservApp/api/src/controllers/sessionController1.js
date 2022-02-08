const { token2 } = require("./sessionController.js");

async function session1(req, res) {
  let { tokenId, mail, name, surname } = req.body;
  token2.tokenId = tokenId;
  token2.mail = mail;
  token2.name = name;
  token2.surname = surname;

  if (!token2.tokenId && !token2.mail && !token2.name && !token2.surname)
    return res.json({
      result: "success",
      data: "La sesión iniciada con google ha sido cerrada",
      login: false,
    });

  // console.log('soy el token de /session'+token2)
  //res.json(token2)
  // res.redirect('/session')
}

module.exports = {
  session1,
  //getUserInfo,
  //optionsUser,
};