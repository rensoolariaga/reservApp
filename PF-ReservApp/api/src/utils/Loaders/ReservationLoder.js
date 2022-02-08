const { Field, Reservation, User } = require("../../db.js");
const {
  ReservationCheck,
  ReservationCreator,
} = require("../ReservationTools.js");

const reservations = [
  {
    date: "2021-11-15",
    startTime: 20,
    startHalf: false,
    endTime: 21,
    endHalf: true,
    cost: "1400",
    mpId: "18267540392"
  },
  {
    date: "2021-11-16",
    startTime: 18,
    startHalf: false,
    endTime: 21,
    endHalf: false,
    cost: "600",
    mpId: "23967540392"
  },
  {
    date: "2021-12-16",
    startTime: 16,
    startHalf: false,
    endTime: 18,
    endHalf: false,
    cost: "700",
    mpId: "74967540393"
  },
  {
    date: "1998-12-17",
    startTime: 17,
    startHalf: false,
    endTime: 19,
    endHalf: false,
    cost: "800",
    mpId: "35896755935"
  },
];

async function loadReservations(rarray) {
  let users = await User.findAll({ where: { superuser: false } });
  let fields = await Field.findAll();
  let indexf = 0;
  let indexu = 0;
  let params = {};

  rarray.forEach((element) => {
    params.fieldID = fields[indexf].dataValues.id;
    params.date = element.date;
    params.startTime = element.startTime;
    params.startHalf = element.startHalf;
    params.endTime = element.endTime;
    params.endHalf = element.endHalf;

    if (ReservationCheck(params)) {
      params.cost = element.cost;
      ReservationCreator(params, users[indexu].dataValues.id);
    } else
      console.log("No Helou");
    indexf++;
    indexu++;
    if (indexf >= fields.length) indexf = 0;
    if (indexu >= users.length) indexu = 0;
  });
}

module.exports = {
  reservations: reservations,
  loadReservations: loadReservations,
};