// importo el componente para utilizarlo en las funciones
const { Field, Reservation, User } = require("../db");
const { getAuth } = require("firebase/auth");
const {
  ReservationCheck,
  ReservationCreator,
} = require("../utils/ReservationTools");
const { UUIDcheck } = require("../utils/UUIDcheck.js");

const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const { templateSuccessEmail } = require("../utils/Templates/templateHTML");
const { token2 } = require("./sessionController.js");

// configuracion para nodemailer
// const createTrans = () => {
//   var transport = nodemailer.createTransport(
//     nodemailerSendgrid({
//       apiKey:
//         "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",
//     })
//   );
//   return transport;
// };

const createTrans = () => {
  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rreservapp@gmail.com',
      pass: 'Nodemailer*098123',
    },
  });
  return transport;
}

const postReservation = async (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(req.body)

  if (!user && !token2.mail) return res.json("No hay usuario loggeado"); // + google session

  let mail;
  if (user) mail = user.email;
  if (token2.mail) mail = token2.mail;

  let userID = "";
  await User.findOne({ where: { mail: mail } }).then((ureg) => {
    userID = ureg.id;
  });

  if (!userID) return res.json("No existe el user ID");

  let flag = false;

  Object.keys(req.body).forEach((el) => {
    if (!req.body[el] && req.body[el] !== true && req.body[el] !== false) {
      flag = true;
      return res.json("Falta valor para: " + el);
    }
  });

  if (flag) return;

  const validatedBody = {
    fieldID: req.body.fieldID,
    date: req.body.date,
    startTime: parseInt(req.body.startTime),
    startHalf: req.body.startHalf === "true" ? true : false,
    endTime: parseInt(req.body.endTime),
    endHalf: req.body.endHalf === "true" ? true : false,
    cost: parseInt(req.body.cost),
    mpID: req.body.mpID,
    // nombre de cancha y de complejo
  };

  if (!UUIDcheck(req.body.fieldID)) {
    return res.json("FieldID no es del tipo UUID");
  }

  await Field.findOne({ where: { id: req.body.fieldID } }).then((freg) => {
    if (!freg) flag = true;
  });

  if (flag) return res.json("No se encontro cancha con ese ID");
  else {
    flag = await ReservationCheck(validatedBody);

    if (flag) {
      return res.json("Elige otro horario");
    } else {
      flag = await ReservationCreator(validatedBody, userID);

      if (flag) {
        return res.json("Error en la creación de la reserva");
      } else {
        //envío de correo 
        try {
          const transporter = createTrans();
          const info = await transporter.sendMail({
            from: '"reservapp" <rreservapp@gmail.com>',
            to: mail,
            subject: "reservapp",
            html: templateSuccessEmail(
              validatedBody.fieldID,
              validatedBody.date,
              validatedBody.startTime,
              validatedBody.endTime,
              validatedBody.cost,
              validatedBody.mpID,
              mail
            ),
          });
        } catch (error) {
          console.log(error);
        }
        return res.json("Reserva creada correctamente")
      }
    }
  }
};

const getReservation = async (req, res) => {
  // recibo el id por query (url)
  const { id, date, userID, mpID } = req.query;

  params = {};

  if (id) params.id = id;
  if (userID) params.userId = userID;
  if (date) params.date = date;
  if (mpID) params.mpId = mpID;

  await Reservation.findAll({ where: params })
    .then((rreg) => {
      if (rreg) return res.json(rreg);
      else return res.json("No se han encontrado reservas");
    })
    .catch((error) => {
      return res.json("Error buscando reserva. ", error);
    });
};

const deleteReservation = async (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user && !token2.mail) return res.json("No hay usuario loggeado"); // + google session

  const { id } = req.query;

  try {
    const deleteReservationById = await Reservation.findByPk(id);
    deleteReservationById ? res.json(await deleteReservationById.destroy()) : res.json('No se ha podido eliminar la reserva')
  }
  catch (error) {

    deleteReservationById
      ? res.json(await deleteReservationById.destroy())
      : res.json("No se ha podido eliminar la reserva");
  }
};

const updateReservation = async (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user && !token2.mail) return res.json("No hay usuario loggeado"); // + google session

  const { id, date, startTime, startHalf, endTime, endHalf, cost, fieldID } =
    req.body;

  try {
    const reservationById = await Reservation.findByPk(id);

    reservationById
      ? res.json(
        await reservationById.update({
          date,
          startTime,
          startHalf,
          endTime,
          endHalf,
          cost,
          fieldID,
        })
      )
      : res.json("No se pudo actualizar la reserva");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postReservation,
  getReservation,
  deleteReservation,
  updateReservation,
};