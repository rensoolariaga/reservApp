// importo el componente para utilizarlo en las funciones
const { Fieldtype } = require("../db");

const getAllFields = async (req, res) => {
  try {
    await Fieldtype.findAll().then((response) => {
      response
        ? res.json(response)
        : res.json("Error buscando tipos de cancha");
    });

  } catch (error) { }
};

module.exports = {
  getAllFields,
};