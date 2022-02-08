const { Complex, Field, Privileges, Reservation, User } = require("../db.js");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getPrivileges } = require("../utils/getPrivileges.js");
const { token2 } = require("./sessionController.js");

async function postUser(req, res) {
  /*
      Postea User. Recibe parametros por body, se fija si hay usuario con dicho mail creado
      y se crea en caso de no haber
    */

  const auth = getAuth();
  const user = auth.currentUser;

  if (user || token2.mail)
    return res.json("Cierra sesión para poder registrar una cuenta nueva");

  const { mail, password, name, surname, birthdate, province, district } =
    req.body;
  // Formato para enviar cumpleaños: 1991-11-28

  const check = await User.findOne({
    where: {
      mail: mail,
    },
  });

  if (check) res.json("Usuario ya existente en la base de datos");
  else {
    const user = {
      name,
      surname,
      mail,
      birthdate,
      province,
      district,
    };

    let flag = false;

    await createUserWithEmailAndPassword(auth, mail, password)
      .then(() => {
        // Signed in
      })
      .catch((error) => {
        flag = true;
        return res.json({ type: "failure", data: error.message });
      });
    if (!flag) {
      try {
        const newUser = await User.create(user);
        if (newUser) res.json({ type: "success", data: user });
        else {
          res.json({ type: "failure", data: "Error en creación de usuario" });
        }
      } catch (error) {
        res.send({ type: "failure", data: error });
      }
    }
  }
}

async function getUserInfo(req, res) {
  //Setteo de Firebase
  const auth = getAuth();
  const user = auth.currentUser;

  //Si hay usuario logeado
  if (user || token2.mail) {
    // Busco en la base de datos al mail que me trae el Firebase del usuario loggeado
    let mail;
    if (user) mail = user.email;
    if (token2.mail) mail = token2.mail;
    const uinfo = await User.findOne({
      where: {
        mail: mail,
      },
    });
    let ures = await Reservation.findAll({
      where: { userId: uinfo.dataValues.id },
    });

    let pres = await getPrivileges(uinfo.dataValues.id);

    const fres = [];
    if (pres.length !== 0) {
      for (element of pres) {
        const allFields = await Field.findAll({
          where: { complexId: element.complexId },
          include: "fieldtype",
        });
        for (fieldObj of allFields) {
          fres.push(fieldObj.dataValues);
        }
      }
    }

    res.json({
      result: "success",
      data: {
        userInfo: uinfo.dataValues,
        privileges: pres,
        fields: fres,
        reservations: ures,
      },
    });
  }
  //Si no hay usuario logeado
  else res.json({ result: "failure", data: "No hay usuario logeado" });
}

async function optionsUser(req, res) {
  return res.status(200);
}

async function putUser(req, res) {
  const { id, name, surname, birthdate, province, district } = req.body;

  const update = {};
  if (name) update.name = name;
  if (surname) update.surname = surname;
  if (birthdate) update.birthdate = birthdate;
  if (province) update.province = province;
  if (district) update.district = district;

  await User.update(update, { where: { id: id } })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
}

async function deleteUser(req, res) {
  const { id } = req.query;
  const rdestroy = User.destroy({ where: { id: id } });

  if (rdestroy !== 0) {
    const arrayPriv = await Privileges.findAll({
      where: {
        userId: id,
      },
    });
    /*
      [{}, {}]
    */

    arrayPriv.forEach(async (element) => {
      await Complex.destroy({
        where: { id: element.dataValues.complexId },
      });
      await Field.destroy({
        where: { complexId: element.dataValues.complexId },
      });
    });

    await Reservation.destroy({ where: { userId: id } });
    await Privileges.destroy({ where: { userId: id } });
  }

  res.json("Borrado finalizado");
}

async function getAllUsers(req, res) {
  await User.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
}

async function getByID(req, res) {
  const { id } = req.query;

  console.log(id);

  const userInfo = await User.findOne({ where: { id: id } });
  const privilegesInfo = await Privileges.findAll({
    where: { userId: id },
    include: "complex",
  });

  await Reservation.findAll({ where: { userId: id } })
    .then((response) =>
      res.json({
        userInfo: userInfo,
        privileges: privilegesInfo,
        reservations: response,
      })
    )
    .catch((error) => res.json(error));
}

module.exports = {
  postUser,
  getUserInfo,
  optionsUser,
  putUser,
  deleteUser,
  getAllUsers,
  getByID,
};