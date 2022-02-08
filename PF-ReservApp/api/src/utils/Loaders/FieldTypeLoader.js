const { Fieldtype } = require("../../db.js");

const fieldTypes = [
  { type: "Futbol 4" },
  { type: "Futbol 5" },
  { type: "Futbol 7" },
  { type: "Futbol 8" },
  { type: "Futbol 11" },
  { type: "Tenis" },
  { type: "Basquet" },
  { type: "Padel" },
  { type: "Natacion" },
  { type: "Hockey" },
  { type: "Atletismo" },
  { type: "Rugby" },
  { type: "Handball" },
  { type: "Voley" },
  { type: "Golf" },
  { type: "Ping-pong" },
];

async function loadFieldType(array) {
  Fieldtype.bulkCreate(array);
}

module.exports = {
  fieldTypes: fieldTypes,
  loadFieldType: loadFieldType,
};