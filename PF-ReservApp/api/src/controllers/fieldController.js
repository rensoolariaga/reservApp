// importo el componente para utilizarlo en las funciones
const { Complex, Field, Fieldtype, Reservation } = require("../db");

// modifiqué, agrego validacion para que si no esta registrado no puedo agregar cancha
const { getAuth } = require("firebase/auth");

const { UUIDcheck } = require("../utils/UUIDcheck");

const { token2 } = require("./sessionController.js");

const postField = async (req, res) => {

  // modifiqué, agrego validacion para que si no esta registrado no puedo agregar cancha
  const auth = getAuth();
  const user = auth.currentUser;

  // if (!user) return res.json("No hay usuario logeado");
  if (!user && !token2.mail)
    return res.json("Logeate para poder crear un complejo");
  // atributos del body para pasarle a postman
  const { name, cost, complexID, fieldtypeID } = req.body; // modifique, estaba puesto req.query
  let flag = false;
  // if (!cost) return res.json("Falta propiedad costo");
  // else {
  //   if (!complexID) return res.json("Falta propiedad complexID");
  //   else {
  //     if (!UUIDcheck(complexID))
  //       return res.json("ComplexID no es del tipo UUID");
  //     if (!fieldtypeID) return res.json("Falta propiedad fieldtypeID");
  //   }
  // }

  await Complex.findOne({
    where: {
      id: complexID,
    },
  })
    .then((creg) => {
      if (!creg) flag = true;
    })
    .catch((error) => res.json(error));

  if (flag) return res.json("No se encontro complejo con ese ID");

  await Fieldtype.findOne({
    where: {
      id: fieldtypeID,
    },
  }).then((freg) => {
    if (!freg) flag = true;
  });

  if (flag) return res.json("No se encontro field type con ese ID");

  try {
    await Field.create({ cost: cost, name: name })
      .then((reg) => {
        reg.setComplex(complexID);
        reg.setFieldtype(fieldtypeID);
        reg ? res.json(reg) : res.json("No se pudo crear cancha");
      })
      .catch((e) => res.json(e));
  } catch (error) {
    // si se rompe algo
    res.json(error);
  }
};

const getField = async (req, res) => {
  const { id, fieldTypeID } = req.query;

  try {
    let params = {};

    if (id) params.id = id;
    if (fieldTypeID) params.fieldtypeId = fieldTypeID;

    let fres = {};

    fres = await Field.findAll({
      where: params ? params : null,
      include: ["fieldtype", "complex"],
    });

    if (id) {
      const response = await Reservation.findAll({ where: { fieldId: id } });
      return res.json({
        field: fres,
        reservations: response,
      });
    }
    if (fres) return res.json(fres);
    else return res.json("No se han encontrado canchas");
  } catch (error) {
    res.json(error);
  }
};

async function putField(req, res) {
  const { id, name, cost, fieldtypeID } = req.body;

  const update = {};
  if (name) update.name = name;
  if (cost) update.cost = cost;
  if (fieldtypeID) update.fieldtypeID = fieldtypeID;

  await Field.update(update, { where: { id: id } })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
}

async function deleteField(req, res) {
  const { id } = req.query;
  console.log('soy el id de deleteField(controller): ', id)

  const rdestroy = Field.destroy({ where: { id: id } });

  if (rdestroy !== 0) {
    await Reservation.destroy({ where: { "fieldId": id } });
  }

  res.json("Eliminación exitosa");

}

module.exports = {
  deleteField,
  getField,
  postField,
  putField,
};