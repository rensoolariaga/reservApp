const { Reservation } = require("../db");

ReservationCheck = async function ({
  fieldID,
  date,
  startTime,
  startHalf,
  endTime,
  endHalf,
}) {
  let auxRes = {
    date: date,
    startTime: parseInt(startTime),
    half: startHalf,
  };

  let flag = false;

  let params = { fieldId: fieldID };
  while (!flag) {
    params.date = auxRes.date;
    params.startTime = auxRes.startTime;
    params.half = auxRes.half;
    await Reservation.findOne({
      where: params,
    })
      .then((cRes) => {
        if (cRes) flag = true;
      })
      .catch((e) => console.log(e));
    if (!flag) {
      if (auxRes.startTime >= endTime && auxRes.half === endHalf) return false;
      if (auxRes.half) {
        auxRes.half = false;
        auxRes.startTime += 1;
      } else auxRes.half = true;
    }
  }
  return true;
};

ReservationCreator = async function (
  { fieldID, date, startTime, startHalf, endTime, endHalf, cost, mpID },
  userID
) {
  let creservation = {
    date: date,
    startTime: parseInt(startTime),
    half: startHalf,
    cost: parseInt(cost),
    mpId: mpID,
  };

  let sreservation = {
    endTime: parseInt(endTime),
    half: endHalf,
  };

  let flag = false;
  let error = false;

  while (!flag) {
    await Reservation.create(creservation)
      .then((creg) => {
        creg.setUser(userID);
        creg.setField(fieldID);
      })
      .catch((e) => {
        error = true;
        return false;
      });

    if (error) return false;

    if (
      creservation.startTime >= sreservation.endTime &&
      creservation.half === sreservation.half
    ) {
      flag = true;
    } else {
      if (creservation.half === true) {
        creservation.half = false;
        creservation.startTime += 1;
      } else creservation.half = true;
    }
  }

  return false;
};

module.exports = {
  ReservationCheck: ReservationCheck,
  ReservationCreator: ReservationCreator,
};