const { getAuth } = require("firebase/auth");
const { Complex, Field, Privileges, Reservation, User } = require("../db");
const { token2 } = require("./sessionController.js");

async function getComplexID(req, res) {
  const auth = getAuth();
  const user = auth.currentUser;

  // if (!user) return res.json("No hay usuario logeado");
  if (!user && !token2.mail)
    return res.json("Logeate para poder crear un complejo");

  const { id } = req.query;

  const rfields = await Field.findAll({
    where: { complexId: id },
    include: "fieldtype",
  });

  const rcomplex = await Complex.findOne({ where: { id: id } });

  /*
  Traerme todas las reservas edl mes
  */
  let currentMonth = new Date().getMonth() + 1;
  const rreservations = await Reservation.findAll();
  let reservationsInfo = rreservations.filter((e) => {
    return parseInt(e.dataValues.date.split("-")[1]) <= currentMonth;
  });

  let resArr = [];
  reservationsInfo.forEach((elementRes, index) => {
    rfields.forEach((elementFie) => {
      if (elementFie.dataValues.id === elementRes.dataValues.fieldId) {
        resArr.push(elementRes);
      }
    });
  });

  res.json({
    complexInfo: rcomplex,
    fieldsInfo: rfields,
    rReservations: resArr,
  });
}

async function postComplex(req, res) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user && !token2.mail)
    return res.json("Logeate para poder crear un complejo");

  let mail;
  if (user) mail = user.email;
  if (token2.mail) mail = token2.mail;

  const loggedUser = await User.findOne({
    where: {
      mail: mail,
    },
  });
  const {
    name,
    province,
    district,
    address,
    description,
    openfrom,
    opento,
    images,
  } = req.body;
  // Este check edberia omitir mayusc y minusc. ilook podria encargarse de eso?
  const check = await Complex.findOne({
    where: {
      name: name,
    },
  });

  if (check) res.json("Ya existe un complejo con ese nombre");
  else {
    const complex = {
      name,
      province,
      district,
      address,
      description,
      openfrom,
      opento,
      images,
    };
    const newComplex = await Complex.create(complex);
    if (!newComplex) return res.json("Error en creación de complejo");

    await Privileges.create({
      owner: true,
    }).then((priv) => {
      priv.setUser(loggedUser.dataValues.id);
      priv.setComplex(newComplex.id);

      //  fue creado el privilige? Entonces lo devuelvo.
      priv
        ? res.json(newComplex)
        : res.json("No se ha podido crear privilegio");
    });
  }
}

async function getAllComplexes(req, res) {
  const { province, district } = req.query;

  var filter = {};
  if (province) filter.province = province;
  if (district) filter.district = district;

  try {
    const complexes = await Complex.findAll({ where: filter });
    res.json(complexes);
  } catch (error) { }
}

async function putComplex(req, res) {
  const {
    id,
    name,
    province,
    district,
    address,
    description,
    openfrom,
    opento,
    images,
  } = req.body;

  const update = {};
  if (name) update.name = name;
  if (province) update.province = province;
  if (district) update.district = district;
  if (address) update.address = address;
  if (description) update.description = description;
  if (openfrom) update.openfrom = openfrom;
  if (opento) update.opento = opento;
  if (images) update.images = images;

  await Complex.update(update, { where: { id: id } })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
}

async function deleteComplex(req, res) {
  const { id } = req.query;

  const rdestroy = Complex.destroy({ where: { id: id } });

  if (rdestroy !== 0) {
    await Privileges.destroy({ where: { complexId: id } });

    let fieldArr = await Field.findAll({ where: { complexId: id } });

    fieldArr.forEach(async (element) => {
      await Reservation.destroy({ where: { fieldId: element.dataValues.id } });
    });
    await Field.destroy({ where: { complexId: id } });
  }

  res.json("Eliminación exitosa");
}

module.exports = {
  deleteComplex,
  getAllComplexes,
  getComplexID,
  postComplex,
  putComplex,
};