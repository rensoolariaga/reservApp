const {
  ComplexExamples,
  loadComplex,
} = require("./ComplexLoader.js");

const { fieldTypes, loadFieldType } = require("./FieldTypeLoader.js");
const {
  FieldExamples,
  LoadField,
} = require("./FieldLoader.js");
const { users, loadUsers } = require("./UserLoader.js");
//const { reservations } = require("./ReservationLoder.js")

async function loader() {
  await loadFieldType(fieldTypes);
  await loadUsers(users);
  await loadComplex(ComplexExamples);
  await LoadField(FieldExamples);
  //await loadReservations(reservations)
}

module.exports = {
  loader: loader,
};