const token2 = { tokenId: null, mail: null, name: null, surname: null };
const { getAuth } = require("firebase/auth");
const { Privileges, Reservation, User } = require("../db.js");
const { getPrivileges } = require("../utils/getPrivileges.js");

async function session(req, res) {
  // verifica si hay una sesión activa en firestore
  const auth = getAuth();
  const user = auth.currentUser;

  if (user)
    return res.json({
      type: "failure",
      data: "Cierra sesión para poder registrar una cuenta nueva",
    });

  let { tokenId, mail, name, surname } = req.body;
  token2.tokenId = tokenId;
  token2.mail = mail;
  token2.name = name;
  token2.surname = surname;

  /*
      Postea User. Recibe parametros por body, se fija si hay usuario con dicho mail creado
      y se crea en caso de no haber
    */

  const check = await User.findOne({
    where: {
      mail: token2.mail,
    },
  });

  if (check) {
    res.json({
      result: "succes login with google",
      data: "Usuario ya existente en la base de datos",
      login: true
    });
  } else {
    const user = {
      name,
      surname,
      mail,
    };

    let flag = false;

    if (!flag) {
      try {
        const newUser = await User.create(user);
        if (newUser) res.json({ result: "success", data: user, login: true });
        else {
          res.json({ result: "failure", data: "Error en creación de usuario" });
        }
      } catch (error) {
        res.send(error);
      }
    }
  }
}

module.exports = {
  session,
  token2,
};